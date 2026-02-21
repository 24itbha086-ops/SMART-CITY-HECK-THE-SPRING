import { useState } from "react";
import { Link } from "react-router-dom";
import useCommunity from "../../hooks/useCommunity";

// Helper function to format time ago
const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return date.toLocaleDateString();
};

// Post Card Component for regular posts
const PostCard = ({ post, onLike }) => {
  const isIssuePost = post.type === "issue";
  
  return (
    <article className={`overflow-hidden rounded-xl border ${isIssuePost ? 'border-orange-200 bg-orange-50/50' : 'border-slate-200 bg-white'} shadow-sm`}>
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              alt="Avatar"
              className="h-10 w-10 rounded-full object-cover"
              src={post.author.avatar}
            />
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold">{post.author.name}</h4>
                {isIssuePost && (
                  <span className="rounded-full bg-orange-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                    Issue Report
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500">
                {formatTimeAgo(post.createdAt)} {post.location && `• ${post.location}`}
              </p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>
        
        {/* Issue specific details */}
        {isIssuePost && post.issueData && (
          <div className="mb-4 rounded-lg bg-orange-100 p-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="material-symbols-outlined text-orange-600">report_problem</span>
              <span className="font-semibold text-orange-800">{post.issueData.category}</span>
              <span className={`ml-auto rounded px-2 py-0.5 text-xs font-medium ${
                post.issueData.priority === 'high' ? 'bg-red-200 text-red-800' :
                post.issueData.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                'bg-green-200 text-green-800'
              }`}>
                {post.issueData.priority} priority
              </span>
            </div>
          </div>
        )}
        
        <p className="mb-4 whitespace-pre-line text-sm leading-relaxed text-slate-700">
          {post.content}
        </p>
        
        {/* Show multiple images for issue posts, single image for others */}
        {post.images && post.images.length > 0 ? (
          <div className={`mb-4 gap-2 overflow-hidden rounded-xl ${post.images.length === 1 ? '' : 'grid grid-cols-2'}`}>
            {post.images.slice(0, 4).map((imgUrl, index) => (
              <div key={index} className={`relative ${post.images.length === 1 ? '' : 'aspect-square'}`}>
                <img
                  alt={`Issue photo ${index + 1}`}
                  className={`w-full object-cover ${post.images.length === 1 ? 'h-64 rounded-xl' : 'h-full rounded-lg'}`}
                  src={imgUrl}
                />
                {index === 3 && post.images.length > 4 && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
                    <span className="text-2xl font-bold text-white">+{post.images.length - 4}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : post.image ? (
          <div className="mb-4 overflow-hidden rounded-xl">
            <img
              alt="Post"
              className="h-64 w-full object-cover"
              src={post.image}
            />
          </div>
        ) : null}
        
        {/* View Issue Link for issue posts */}
        {isIssuePost && post.issueId && (
          <Link 
            to={`/citizen/issues/${post.issueId}`}
            className="mb-4 flex items-center gap-2 text-sm font-medium text-[#13b6ec] hover:underline"
          >
            <span className="material-symbols-outlined text-base">visibility</span>
            View Issue Details
          </Link>
        )}
        
        <div className="flex items-center gap-6 border-t border-slate-100 pt-4">
          <button 
            onClick={() => onLike(post.id)}
            className="flex items-center gap-2 text-slate-500 transition-colors hover:text-red-500"
          >
            <span className="material-symbols-outlined text-xl">favorite</span>
            <span className="text-sm font-bold">{post.likes}</span>
          </button>
          <button className="flex items-center gap-2 text-slate-500 transition-colors hover:text-[#13b6ec]">
            <span className="material-symbols-outlined text-xl">chat_bubble</span>
            <span className="text-sm font-bold">{post.comments}</span>
          </button>
          <button className="flex items-center gap-2 text-slate-500 transition-colors hover:text-[#13b6ec]">
            <span className="material-symbols-outlined text-xl">share</span>
            <span className="text-sm font-bold">{post.shares}</span>
          </button>
        </div>
      </div>
    </article>
  );
};

const CommunityPage = () => {
  const { posts, likePost } = useCommunity();
  const [filter, setFilter] = useState("all"); // "all", "issues", "general"
  
  const filteredPosts = posts.filter(post => {
    if (filter === "all") return true;
    if (filter === "issues") return post.type === "issue";
    if (filter === "general") return post.type === "general";
    return true;
  });
  
  const leaderboard = [
    {
      name: "Liam Smith",
      role: "Volunteer Hero",
      points: "1,240 pts",
      badge: "1",
      badgeColor: "bg-yellow-400",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCoGhawqaToI2Y3BJnTDgQ2R_RgchOcByBOFQcDS4LlLYvHyja1WlN1lPMH_9qZO2Tz1q5i_THHq9kjCAdfacFrB4r3KT5qliOzFwqv93j0fYXuZXq_HJ3qIN9iEWUqzOK8ilr9Q-MGqky-O-6Dr4axcZUak9vWOCIsfX4ASad5dhfnWaeY6mMh0Gx43YUaKRfMefhj_VVnCxx6MONimXRc5qWmtYKupP2zv_IBj1ap0OLsgB5qrfzQrBnILwFlUHFd5xjFqI55IrbU",
    },
    {
      name: "Sarah Jenkins",
      role: "Green Thumb",
      points: "985 pts",
      badge: "2",
      badgeColor: "bg-slate-300",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAk5eJ0aKRFnpKbO_5z-2uTJxe1tSv0ghy2TjqR0zBSyudKgsD2vIqzLceHC55IlSvXicam7eeyS4wXImefAd7BE7UqB76_91G9WZqaQWsUmRL-mKkxyPUqXhFRGDonmQXKS4QA1fuOZL2veYuuvUuo7YkVsaQPhzj8-zDcdEK_gvSnTS7M4WhjE30P5OqVun2tXIpS20-J1FrhfnGm6rF4kwRh9Yclx5ShaLVKdXjoUk51SxJzugNAW16kIEmxEDV-Mt2WlVDxM3Dg",
    },
    {
      name: "David Wilson",
      role: "Active Member",
      points: "820 pts",
      badge: "3",
      badgeColor: "bg-orange-300",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD3jWmjNHLeGQQkZuXZFyglw30tppW1_UXoTEs6kf0UbFzv54R_ebQdBREWUIRnw-Ax4l-m3YHspGygywSHvlWwtaszdeeBupcAeFbJONwS8bBdpxpaFNcxkvnPGyZg0hLt0igCwJuGNGVbepBttoi-rZIydL2eKJrjfGqHzd-8iBTtHq8v0kY6YO_trODgxR6MU1R-sInHKqoqc55MgQmFPysyaLvBbOztv-d6QCEzPfjmWOMLT_ucWwKqTheIw0mNnpuGMOxI70EZ",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-8">
          <section className="group relative h-80 overflow-hidden rounded-xl shadow-xl">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB_akrvpD4BJl_8sw0dEXxg537OzOccyzSCdZ3-2qaVcoW0UOTYXCRP6WZPrZ8vhP4ysBy0x0y_XbtGKZzbf6huHFaSuNYb26pQg584XG7MR_06VKTFfGxVoaMLmRD1Pf6eUVpHhJYpn-h-j61Pi5BXtjPLWoOctHQJa00emDiBGhMDm4v90hV9iqVeo16BaRdYcrNmvEJfYyc144ZR6acspvAfts_7rHGBqt97zwCUrP_WU26OhR68YahsDZIbLVKJoXjufuGvzMk0')",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-8 md:w-2/3">
                <span className="mb-4 inline-block rounded-full bg-[#13b6ec] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#102217]">
                  Major Success
                </span>
                <h2 className="mb-3 text-3xl font-bold text-white md:text-4xl">Annual River Cleanup Success</h2>
                <p className="mb-6 text-lg text-slate-200">
                  We collected over 2 tons of debris from the community waterfront! A massive thank you to our 150+
                  volunteers.
                </p>
                <button className="flex items-center gap-2 rounded-xl bg-[#13b6ec] px-6 py-3 font-bold text-[#102217] transition-all hover:scale-105 hover:bg-[#13b6ec]/90">
                  <span>See Results</span>
                  <span className="material-symbols-outlined">trending_up</span>
                </button>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-2xl font-bold">
                  <span className="material-symbols-outlined text-[#13b6ec]">dynamic_feed</span>
                  Local Updates Feed
                </h3>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setFilter("all")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium ${filter === "all" ? "border border-slate-200 bg-white shadow-sm" : "text-slate-500"}`}
                  >
                    All
                  </button>
                  <button 
                    onClick={() => setFilter("issues")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium ${filter === "issues" ? "border border-orange-200 bg-orange-50 text-orange-600" : "text-slate-500"}`}
                  >
                    🚨 Issues
                  </button>
                  <button 
                    onClick={() => setFilter("general")}
                    className={`rounded-lg px-4 py-2 text-sm font-medium ${filter === "general" ? "border border-slate-200 bg-white shadow-sm" : "text-slate-500"}`}
                  >
                    General
                  </button>
                </div>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
                  <span className="material-symbols-outlined mb-2 text-4xl text-slate-400">feed</span>
                  <p className="text-slate-500">No posts yet. Be the first to share!</p>
                </div>
              ) : (
                filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} onLike={likePost} />
                ))
              )}
            </section>
          </div>

          <aside className="space-y-8 lg:col-span-4">
            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <span className="material-symbols-outlined text-[#13b6ec]">potted_plant</span>
                Community Goal
              </h3>
              <div className="mb-6">
                <div className="mb-2 flex items-end justify-between">
                  <p className="text-sm font-medium text-slate-600">Plant 500 Trees</p>
                  <p className="text-2xl font-bold text-[#13b6ec]">75%</p>
                </div>
                <div className="h-4 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-[75%] rounded-full bg-[#13b6ec] shadow-[0_0_10px_rgba(19,182,236,0.3)]" />
                </div>
                <p className="mt-2 text-xs text-slate-500">375/500 trees planted so far!</p>
              </div>
              <button className="w-full rounded-xl border border-[#13b6ec]/20 bg-[#13b6ec]/10 py-3 font-bold text-[#13b6ec] transition-colors hover:bg-[#13b6ec]/20">
                Join Challenge
              </button>
            </section>

            <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-lg font-bold">
                <span className="material-symbols-outlined text-[#13b6ec]">workspace_premium</span>
                Top Neighbors
              </h3>
              <div className="space-y-4">
                {leaderboard.map((person) => (
                  <div key={person.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img alt={person.name} className="h-10 w-10 rounded-full object-cover" src={person.image} />
                        <span
                          className={`absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-white text-[10px] font-bold ${person.badgeColor}`}
                        >
                          {person.badge}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">{person.name}</h4>
                        <p className="text-xs text-slate-500">{person.role}</p>
                      </div>
                    </div>
                    <p className="text-sm font-bold text-[#13b6ec]">{person.points}</p>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full text-sm font-medium text-slate-500 transition-colors hover:text-[#13b6ec]">
                View All Leaderboard
              </button>
            </section>

            <section className="space-y-4">
              <div className="flex gap-4 rounded-xl border border-red-200 bg-red-50 p-4">
                <div className="h-fit rounded-lg bg-red-100 p-2">
                  <span className="material-symbols-outlined text-red-600">warning</span>
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-bold text-red-700">Road Closure</h4>
                  <p className="text-xs text-red-600">
                    Bridge construction on 5th Ave starting Monday. Expect delays.
                  </p>
                </div>
              </div>

              
            </section>

            <div className="p-4 text-center">
              <p className="text-xs text-slate-400">© 2024 CitizenHub. All rights reserved.</p>
              <div className="mt-2 flex justify-center gap-4">
                <a className="text-xs text-slate-500 hover:text-[#13b6ec]" href="#">
                  Help
                </a>
                <a className="text-xs text-slate-500 hover:text-[#13b6ec]" href="#">
                  Privacy
                </a>
                <a className="text-xs text-slate-500 hover:text-[#13b6ec]" href="#">
                  Guidelines
                </a>
              </div>
            </div>
          </aside>
        </div>

      <button className="fixed bottom-6 right-6 flex items-center justify-center rounded-full bg-[#13b6ec] p-4 text-[#102217] shadow-lg transition-transform active:scale-95 lg:hidden">
        <span className="material-symbols-outlined">add</span>
      </button>
    </>
  );
};

export default CommunityPage;
