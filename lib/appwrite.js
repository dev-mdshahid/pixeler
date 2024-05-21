import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from 'react-native-appwrite';
export const appwriteconfig = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.dev-mdshahid.pixeler',
  projectId: '6627184ace9ab32e1061',
  databaseId: '66284a1eaf486f98a922',
  usersCollectionId: '66284a3aa3bbe076af75',
  videosCollectionId: '66284a539aa268bb7568',
  storageId: '66284cc0774595dd8e8a',
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  usersCollectionId,
  videosCollectionId,
  storageId,
} = appwriteconfig;

// Init your react-native SDK
const client = new Client();

client
  .setEndpoint(appwriteconfig.endpoint)
  .setProject(appwriteconfig.projectId)
  .setPlatform(appwriteconfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Register User
export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteconfig.databaseId,
      appwriteconfig.usersCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// Login User
export const signIn = async (email, password) => {
  try {
    const session = await account.createEmailSession(email, password);
    if (!session) throw new Error('Could not create session');
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
export const signOut = async () => {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw new Error('No current account is found!');

    const currentUser = await databases.listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.usersCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    );

    if (!currentUser) throw new Error('No current user is found!');

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.videosCollectionId,
      [Query.equal('approved', true)]
    );
    return posts.documents;
  } catch (error) {
    console.log(error);
  }
};
export const getUnApprovedPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.videosCollectionId,
      [Query.equal('approved', false)]
    );
    return posts.documents;
  } catch (error) {
    console.log(error);
  }
};
export const approvePost = async (id) => {
  try {
    const result = await databases.updateDocument(
      appwriteconfig.databaseId,
      appwriteconfig.videosCollectionId,
      id,
      {
        approved: true,
      }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};
export const deletePost = async (id) => {
  try {
    const result = await databases.deleteDocument(
      appwriteconfig.databaseId,
      appwriteconfig.videosCollectionId,
      id
    );
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.videosCollectionId,
      [
        Query.orderDesc('$createdAt', Query.limit(7)),
        Query.equal('approved', true),
      ]
    );
    return posts.documents;
  } catch (error) {
    console.log(error);
  }
};

export const getSearchedPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.videosCollectionId,
      [Query.search('title', query)]
    );
    return posts.documents;
  } catch (error) {
    console.log(error);
  }
};

export const getUserPosts = async (accountId) => {
  try {
    const posts = await databases.listDocuments(
      appwriteconfig.databaseId,
      appwriteconfig.videosCollectionId,
      [Query.orderDesc('$createdAt')]
    );

    console.log(posts);

    const filtered = posts.documents.filter(
      (post) => post.creator === accountId
    );

    return filtered;
  } catch (error) {
    console.log(error);
  }
};

// Upload File
export async function uploadFile(file, type) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === 'video') {
      fileUrl = storage.getFileView(storageId, fileId);
    } else if (type === 'image') {
      fileUrl = storage.getFilePreview(
        storageId,
        fileId,
        2000,
        2000,
        'top',
        100
      );
    } else {
      throw new Error('Invalid file type');
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Create Video Post
export async function createVideoPost(form) {
  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video'),
    ]);

    const newPost = await databases.createDocument(
      databaseId,
      videosCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.creator,
        username: form.username,
        avatar: form.avatar,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}
