import { createContext, useCallback, useMemo, useState } from "react";

export const CommunityContext = createContext(null);

// Initial community posts data
const initialCommunityPosts = [
  {
    id: "post_1",
    type: "general",
    author: {
      name: "Elena Rodriguez",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfx2MD29tvGL2XLtk64T0BGMdWPXMIyWTQd0h3IZ2eVBCFC8vvBUWCAxzOOhAW2SNycSBdN6mI4xXPusYaKyck13PAGENw8h16OJK1o_4GWKVAuYx2ImOgqXqVhtBfv1Vp1Q4EdOeI9bFbUq2DGNquVE72GeYUEn7tBakpjL5sVqbkwPfIW18OO1HeOYUXn6RO_aDR-HChCBdJOdWAuWZCKJnAas2iXQVlzwE_wa7jszSYozEACqJvSk-00wCM_GIXQ2nNbryKaVQb",
    },
    content: "Our community garden is finally in full bloom! 🌱 Thanks to everyone who helped with the planting last month. If you're interested in fresh tomatoes, we have plenty to share this weekend!",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8BYJcCgDS52bWs4sTiGPiHZWoar0LQRLX37OddSI9-O5vMo740ujN0ZTPUuuZBhiUatcRORBCjRzpWPncROKVSViK6FhL9YkV8p7SpectwHDsigNmb0BS91j0sSbUWwD-Av8-qI0g55p99la556ODAtmpU87dFj7y_r-1AIRGcdCXGjYoAHN0H9Ph_KTt0Pp0kZ-cOObu-tFsHMB1FOOdLOTutLehliMldCnkY3x-vafYV4nTDIkt4hYB0BKzaI1ApiDHthVyY8MB",
    location: "Greenfield Heights",
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    likes: 124,
    comments: 18,
    shares: 5,
  },
  {
    id: "post_2",
    type: "general",
    author: {
      name: "Marcus Chen",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCqhpdVnS1reuKyZCW_ViJ6epooR_VY-IkCoKgUHeE2YDCV9Lqo8PpV61Uq-FBLfLSIPxoWov1X1P9_6vFMvrpWLBEKHjFFl4ZdSEOQI6K2ec-DUKtLd2G5gk7dsrYAKuSEhBsgXsT4fXKN2YImWJ7Klt3WBj8XItpa_oFn8cF_6qYRerov25YDbVCtyK5XkU7kKcMm3xWAVz7VFx-YXuFxeqkwAcubOHbO4AJ0bXms6_q6msFyxfPzScxxODPhwKHbqAPlJPu8Hhfl",
    },
    content: "Does anyone have a tall ladder I could borrow for some gutter cleaning this weekend? Happy to trade for some fresh-baked cookies! 🍪 Let me know!",
    image: null,
    location: "Oakwood District",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    likes: 42,
    comments: 12,
    shares: 2,
  },
];

export const CommunityProvider = ({ children }) => {
  const [posts, setPosts] = useState(initialCommunityPosts);
  const [loading] = useState(false);

  // Add a new community post
  const addPost = useCallback((post) => {
    const newPost = {
      id: `post_${Date.now()}`,
      type: post.type || "general",
      author: post.author,
      content: post.content,
      image: post.image || null,
      location: post.location || "",
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      issueId: post.issueId || null, // Link to issue if it's an issue post
      issueData: post.issueData || null, // Store issue details
    };
    setPosts((prev) => [newPost, ...prev]);
    return newPost;
  }, []);

  // Add an issue as a community post (called when issue is submitted)
  const shareIssueToCommuity = useCallback((issue, user, images = []) => {
    // Get the first image if available
    const postImage = images.length > 0 ? images[0].url : null;
    const allImages = images.map(img => img.url);
    
    const issuePost = {
      id: `post_issue_${issue.id}`,
      type: "issue",
      author: {
        name: user?.name || issue.reportedBy || "Anonymous Citizen",
        avatar: user?.avatar || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || issue.reportedBy || "A"),
      },
      content: `🚨 New Issue Reported: ${issue.title}\n\n${issue.description}`,
      image: postImage,
      images: allImages, // Store all images
      location: issue.location,
      createdAt: issue.reportedAt || new Date().toISOString(),
      likes: 0,
      comments: 0,
      shares: 0,
      issueId: issue.id,
      issueData: {
        id: issue.id,
        title: issue.title,
        category: issue.category,
        priority: issue.priority,
        status: issue.status,
        location: issue.location,
      },
    };
    setPosts((prev) => [issuePost, ...prev]);
    return issuePost;
  }, []);

  // Like a post
  const likePost = useCallback((postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  }, []);

  // Get posts by type
  const getPostsByType = useCallback(
    (type) => {
      if (!type || type === "all") return posts;
      return posts.filter((post) => post.type === type);
    },
    [posts]
  );

  // Get issue posts only
  const issuePosts = useMemo(() => posts.filter((post) => post.type === "issue"), [posts]);

  const value = useMemo(
    () => ({
      posts,
      loading,
      issuePosts,
      addPost,
      shareIssueToCommuity,
      likePost,
      getPostsByType,
    }),
    [posts, loading, issuePosts, addPost, shareIssueToCommuity, likePost, getPostsByType]
  );

  return <CommunityContext.Provider value={value}>{children}</CommunityContext.Provider>;
};
