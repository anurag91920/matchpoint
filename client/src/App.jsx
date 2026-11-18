
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  X,
  MapPin,
  GraduationCap,
  House,
  Compass,
  HeartHandshake,
  Sparkles,
  RefreshCw,
  ArrowRight,
  Users,
  Star,
  ShieldCheck,
  Menu
} from "lucide-react";

import "./index.css";

const API = import.meta.env.VITE_API_URL;

function getList(response, keys = []) {
  if (Array.isArray(response.data)) return response.data;

  for (const key of keys) {
    if (Array.isArray(response.data?.[key])) {
      return response.data[key];
    }
  }

  if (Array.isArray(response.data?.data)) {
    return response.data.data;
  }

  return [];
}

function getProfileId(profile) {
  return profile?._id || profile?.id;
}

function getProfileImage(profile) {
  return (
    profile?.image ||
    profile?.photo ||
    profile?.photoUrl ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=700"
  );
}

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [profiles, setProfiles] = useState([]);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showMatch, setShowMatch] = useState(false);
  const [newMatch, setNewMatch] = useState(null);
  const [swipeDirection, setSwipeDirection] = useState(0);
  const [swiping, setSwiping] = useState(false);

  const currentProfile = profiles[0];

  // Load profiles and mutual matches
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const [feedResponse, matchResponse] = await Promise.all([
        axios.get(`${API}/feed`),
        axios.get(`${API}/matches`)
      ]);

      setProfiles(
        getList(feedResponse, ["profiles", "feed"])
      );

      setMatches(
        getList(matchResponse, ["matches"])
      );
    } catch (err) {
      console.error("API Error:", err);

      setError(
        err.response?.data?.message ||
        "Unable to load profiles. Please check your backend."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Navigation
  const goTo = (tab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Swipe functionality
  const handleSwipe = async (direction) => {
    if (!currentProfile || swiping) return;

    const profileId = getProfileId(currentProfile);

    if (!profileId) {
      setError("Profile ID is missing.");
      return;
    }

    try {
      setSwiping(true);
      setError("");
      setSwipeDirection(direction);

      const action = direction === 1 ? "like" : "pass";

      const response = await axios.post(`${API}/swipe`, {
        profileId,
        action
      });

      const result = response.data?.data || response.data || {};

      // Remove swiped profile from feed
      setProfiles((previous) =>
        previous.filter(
          (profile) => getProfileId(profile) !== profileId
        )
      );

      // Show match only when backend confirms mutual like
      if (result.isMatch === true) {
        const matchedProfile =
          result.match?.profile ||
          result.match ||
          currentProfile;

        setNewMatch(matchedProfile);
        setShowMatch(true);

        const matchResponse = await axios.get(`${API}/matches`);

        setMatches(
          getList(matchResponse, ["matches"])
        );
      }
    } catch (err) {
      console.error("Swipe Error:", err);

      setError(
        err.response?.data?.message ||
        "Swipe failed. Please try again."
      );

      setSwipeDirection(0);
    } finally {
      setTimeout(() => {
        setSwipeDirection(0);
        setSwiping(false);
      }, 300);
    }
  };

  // Mobile drag gesture
  const onDragEnd = (_, info) => {
    if (swiping) return;

    if (info.offset.x > 100) {
      handleSwipe(1);
    } else if (info.offset.x < -100) {
      handleSwipe(-1);
    }
  };

  // Shared navigation items
  const navigationItems = [
    { id: "home", label: "Home", Icon: House },
    { id: "discover", label: "Discover", Icon: Compass },
    { id: "matches", label: "Matches", Icon: HeartHandshake }
  ];

  return (
    <div className="min-h-screen bg-[#faf8fc] text-[#211d2b] pb-24 lg:pb-0">

      {/* ================= HEADER ================= */}

      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-pink-100/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between">

          {/* Logo */}
          <button
            onClick={() => goTo("home")}
            className="text-3xl font-black tracking-tight text-pink-500"
          >
            coy<span className="text-gray-900">.</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navigationItems.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => goTo(id)}
                className={`px-5 py-3 rounded-full flex items-center gap-2 text-sm font-bold transition ${activeTab === id
                    ? "bg-pink-50 text-pink-600"
                    : "text-gray-500 hover:bg-gray-50"
                  }`}
              >
                <Icon size={18} />
                {label}

                {id === "matches" && matches.length > 0 && (
                  <span className="bg-pink-500 text-white text-xs rounded-full px-2 py-0.5">
                    {matches.length}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Header right */}
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-600">
            <span className="w-10 h-10 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center">
              <Sparkles size={20} />
            </span>
            <span className="hidden sm:inline">
              Made for connections
            </span>
          </div>
        </div>
      </header>

      {/* ================= ERROR MESSAGE ================= */}

      {error && (
        <div className="max-w-5xl mx-auto px-4 pt-4">
          <div className="bg-red-50 border border-red-100 text-red-600 rounded-2xl p-4 text-sm flex justify-between items-center gap-3">
            <span>{error}</span>

            <button
              onClick={loadData}
              className="font-bold underline shrink-0"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* ================= HOME DASHBOARD ================= */}

      {activeTab === "home" && (
        <main className="home-dashboard max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

          {/* Welcome Hero */}
          <section className="home-hero relative overflow-hidden rounded-[30px] bg-gradient-to-br from-pink-500 via-pink-500 to-purple-600 text-white p-6 sm:p-10 min-h-[300px] flex items-center">

            {/* Decorative circles */}
            <div className="absolute -right-16 -top-20 w-72 h-72 rounded-full border-[40px] border-white/10" />
            <div className="absolute right-16 -bottom-28 w-64 h-64 rounded-full bg-white/10" />

            <div className="relative z-10 max-w-2xl">

              <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs sm:text-sm font-semibold mb-5">
                <Sparkles size={15} />
                Discover meaningful connections
              </span>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                Your next connection starts here.
              </h1>

              <p className="text-white/90 mt-4 text-sm sm:text-base leading-relaxed max-w-lg">
                Meet interesting people, share your interests
                and discover someone special.
              </p>

              <button
                onClick={() => goTo("discover")}
                className="mt-7 inline-flex items-center gap-3 bg-white text-pink-600 font-bold px-6 py-3.5 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition"
              >
                Start Discovering
                <ArrowRight size={19} />
              </button>
            </div>
          </section>

          {/* Story Card */}
          <section className="home-story mt-6 rounded-[26px] bg-white border border-gray-100 shadow-sm p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-5">

            <div className="flex items-start gap-4 min-w-0">
              <div className="w-12 h-12 shrink-0 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <HeartHandshake size={25} />
              </div>

              <div className="min-w-0">
                <h2 className="text-lg sm:text-xl font-bold">
                  Every connection has a story.
                </h2>

                <p className="text-gray-500 text-sm leading-relaxed mt-2">
                  Take a moment to explore profiles and find
                  people who share your passions.
                </p>
              </div>
            </div>

            <button
              onClick={() => goTo("matches")}
              className="shrink-0 text-pink-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all"
            >
              View your matches
              <ArrowRight size={17} />
            </button>
          </section>

          {/* Statistics */}
          <section className="home-stats grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5 mt-6">

            {/* Profiles */}
            <div className="stat-card bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm">
              <div className="w-11 h-11 bg-pink-50 text-pink-500 rounded-xl flex items-center justify-center">
                <Users size={22} />
              </div>

              <p className="text-2xl sm:text-3xl font-black mt-4">
                {loading ? "..." : profiles.length}
              </p>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Profiles to discover
              </p>
            </div>

            {/* Matches */}
            <div className="stat-card bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm">
              <div className="w-11 h-11 bg-purple-50 text-purple-500 rounded-xl flex items-center justify-center">
                <Heart size={22} />
              </div>

              <p className="text-2xl sm:text-3xl font-black mt-4">
                {matches.length}
              </p>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Mutual matches
              </p>
            </div>

            {/* Personal note */}
            <div className="stat-card col-span-2 sm:col-span-1 bg-white border border-gray-100 rounded-2xl p-4 sm:p-6 shadow-sm">
              <div className="w-11 h-11 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
                <Star size={22} />
              </div>

              <p className="text-xl font-black mt-4">
                Be yourself
              </p>

              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Make genuine connections
              </p>
            </div>
          </section>

          {/* Explore and Recent Matches */}
          <section className="home-content-grid grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-5 sm:gap-6 mt-7">

            {/* Explore Card */}
            <div className="home-panel bg-white rounded-[26px] border border-gray-100 p-5 sm:p-7 shadow-sm">

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-500 flex items-center justify-center shrink-0">
                  <Compass size={23} />
                </div>

                <div className="min-w-0">
                  <h2 className="font-bold text-lg">
                    Explore Discover
                  </h2>

                  <p className="text-gray-500 text-xs sm:text-sm mt-1">
                    Find people with shared interests
                  </p>
                </div>
              </div>

              {currentProfile ? (
                <div className="mt-5 flex items-center gap-4 bg-gray-50 rounded-2xl p-3">
                  <img
                    src={getProfileImage(currentProfile)}
                    alt={currentProfile.name}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />

                  <div className="min-w-0">
                    <p className="font-bold truncate">
                      Your next profile is ready
                    </p>

                    <p className="text-sm text-gray-500 mt-1 truncate">
                      {currentProfile.city || "Discover someone new"}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mt-5 text-sm text-gray-500">
                  {loading
                    ? "Loading profiles..."
                    : "You've explored all available profiles."}
                </p>
              )}

              <button
                onClick={() => goTo("discover")}
                className="w-full mt-5 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition shadow-md shadow-pink-100"
              >
                Explore profiles
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Recent Matches */}
            <div className="home-panel bg-white rounded-[26px] border border-gray-100 p-5 sm:p-7 shadow-sm">

              <div className="flex justify-between items-center gap-3">
                <div className="min-w-0">
                  <h2 className="font-bold text-lg">
                    Recent matches
                  </h2>

                  <p className="text-gray-500 text-xs mt-1">
                    People who liked you back
                  </p>
                </div>

                <button
                  onClick={() => goTo("matches")}
                  className="text-pink-600 text-sm font-bold shrink-0 hover:underline"
                >
                  View all
                </button>
              </div>

              {matches.length === 0 ? (
                <div className="text-center py-8">
                  <HeartHandshake
                    size={36}
                    className="mx-auto text-pink-300 mb-3"
                  />

                  <p className="text-sm text-gray-500">
                    Your matches will appear here.
                  </p>
                </div>
              ) : (
                <div className="mt-5 space-y-4">
                  {matches.slice(0, 3).map((item) => {
                    const profile = item.profile || item;

                    return (
                      <div
                        key={getProfileId(profile)}
                        className="flex items-center gap-3 min-w-0"
                      >
                        <img
                          src={getProfileImage(profile)}
                          alt={profile.name}
                          className="w-12 h-12 rounded-full object-cover shrink-0"
                        />

                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-sm truncate">
                            {profile.name}
                          </p>

                          <p className="text-xs text-gray-500 mt-1 truncate">
                            {profile.city}
                          </p>
                        </div>

                        <Heart
                          size={18}
                          className="text-pink-500 shrink-0"
                          fill="currentColor"
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* Safety Banner */}
          <section className="trust-banner mt-7 rounded-[26px] bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center gap-4">

            <div className="w-12 h-12 shrink-0 bg-white text-purple-600 rounded-2xl flex items-center justify-center">
              <ShieldCheck size={25} />
            </div>

            <div>
              <h3 className="font-bold">
                Good connections start with respect.
              </h3>

              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                Be kind, be genuine and take your time
                getting to know people.
              </p>
            </div>
          </section>
        </main>
      )}


      {/* ================= DISCOVER ================= */}

      {activeTab === "discover" && (
        <main className="discover-page mx-auto w-full max-w-6xl px-4 pb-8 pt-6 sm:px-6 sm:pt-9">

          {/* Heading */}
          <div className="mb-7 text-center sm:mb-9">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-pink-500 shadow-sm">
              <Sparkles size={14} />
              Your people are here
            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Discover people<span className="text-pink-500">.</span>
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
              Every connection starts with a hello. Find someone who shares your interests.
            </p>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="flex min-h-[55svh] flex-col items-center justify-center">
              <div className="relative mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-pink-50">
                <RefreshCw className="animate-spin text-pink-500" size={30} />
                <span className="absolute inset-0 animate-ping rounded-full border border-pink-200 opacity-50" />
              </div>

              <h3 className="text-lg font-bold text-slate-800">
                Finding your people...
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Please wait while we load profiles.
              </p>
            </div>
          ) : (
            <div className="mx-auto flex w-full flex-col items-center">

              {/* Profile Counter */}
              {currentProfile && (
                <div className="mb-4 flex w-full max-w-[460px] items-center justify-between px-1">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Your discovery journey
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-700">
                      {profiles.length} profiles available
                    </p>
                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-pink-50 px-3 py-2 text-xs font-bold text-pink-600">
                    <Heart size={14} />
                    Discover
                  </div>
                </div>
              )}

              {/* Profile Card */}
              <div className="relative h-[min(68svh,660px)] min-h-[410px] w-full max-w-[460px] sm:min-h-[520px]">

                <AnimatePresence mode="wait">
                  {currentProfile && (
                    <motion.div
                      key={getProfileId(currentProfile)}
                      drag={swiping ? false : "x"}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.75}
                      onDragEnd={onDragEnd}
                      whileDrag={{ scale: 1.02 }}
                      initial={{
                        opacity: 0,
                        scale: 0.92,
                        y: 25
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: 0,
                        y: 0,
                        rotate: 0
                      }}
                      exit={{
                        opacity: 0,
                        x: swipeDirection * 600,
                        rotate: swipeDirection * 22,
                        scale: 0.9
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 25
                      }}
                      className="group absolute inset-0 cursor-grab select-none overflow-hidden rounded-[30px] border border-white bg-slate-200 shadow-[0_20px_60px_rgba(30,20,50,0.18)] active:cursor-grabbing sm:rounded-[34px]"
                    >

                      {/* Profile Image */}
                      <img
                        src={getProfileImage(currentProfile)}
                        alt={currentProfile.name}
                        draggable="false"
                        loading="eager"
                        className="absolute inset-0 h-full w-full pointer-events-none object-cover transition-transform duration-700 group-hover:scale-[1.025]"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />

                      {/* Image Overlay */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/90" />

                      {/* Top Glass Header */}
                      <div className="absolute left-4 right-4 top-4 flex items-center justify-between sm:left-5 sm:right-5 sm:top-5">

                        <div className="rounded-full border border-white/30 bg-black/30 px-4 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-xl">
                          <Sparkles size={13} className="mr-1 inline" />
                          {profiles.length} profiles
                        </div>

                        <div className="flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-2 text-xs font-bold text-white shadow-lg backdrop-blur-xl">
                          <span className="h-2 w-2 rounded-full bg-emerald-400" />
                          Discover
                        </div>
                      </div>

                      {/* Pass / Like Indicator */}
                      <AnimatePresence>
                        {swipeDirection !== 0 && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className={`absolute left-6 top-24 z-10 rotate-[-12deg] rounded-xl border-4 px-5 py-2 text-2xl font-black tracking-widest ${swipeDirection > 0
                                ? "border-emerald-400 text-emerald-400"
                                : "border-rose-400 text-rose-400"
                              }`}
                          >
                            {swipeDirection > 0 ? "LIKE" : "PASS"}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Profile Details */}
                      <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-5 text-white sm:p-7">

                        {/* Interests */}
                        <div className="mb-4 flex flex-wrap gap-2">
                          {(currentProfile.interests || [])
                            .slice(0, 5)
                            .map((interest) => (
                              <span
                                key={interest}
                                className="rounded-full border border-white/30 bg-white/15 px-3 py-1.5 text-[11px] font-semibold text-white shadow-sm backdrop-blur-md sm:text-xs"
                              >
                                {interest}
                              </span>
                            ))}
                        </div>

                        {/* Name */}
                        <h2 className="text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                          {currentProfile.name}
                          {currentProfile.age ? `, ${currentProfile.age}` : ""}
                        </h2>

                        {/* City */}
                        {currentProfile.city && (
                          <p className="mt-3 flex items-center gap-2 text-sm font-medium text-white/90">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                              <MapPin size={15} />
                            </span>
                            {currentProfile.city}
                          </p>
                        )}

                        {/* College */}
                        {currentProfile.college && (
                          <p className="mt-2 flex items-center gap-2 text-sm text-white/85">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                              <GraduationCap size={15} />
                            </span>
                            <span className="line-clamp-1">
                              {currentProfile.college}
                            </span>
                          </p>
                        )}

                        {/* Bio */}
                        {currentProfile.bio && (
                          <p className="mt-4 max-w-md text-sm leading-6 text-white/90 line-clamp-3">
                            {currentProfile.bio}
                          </p>
                        )}

                        {/* Bottom Accent */}
                        <div className="mt-5 h-1 w-12 rounded-full bg-gradient-to-r from-pink-400 to-purple-400" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Empty State */}
                {!currentProfile && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center rounded-[30px] border border-pink-100 bg-white px-6 text-center shadow-xl"
                  >
                    <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-pink-50 to-purple-50">
                      <Heart size={43} className="text-pink-500" />
                    </div>

                    <h2 className="text-2xl font-black text-slate-900">
                      You're all caught up!
                    </h2>

                    <p className="mt-3 max-w-xs text-sm leading-6 text-slate-500">
                      You've explored all available profiles. New connections may be waiting for you later.
                    </p>

                    <button
                      onClick={loadData}
                      className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-pink-200 transition hover:-translate-y-1 hover:shadow-xl"
                    >
                      <RefreshCw size={17} />
                      Refresh Feed
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Swipe Actions */}
              {currentProfile && (
                <>
                  <div className="swipe-actions mt-7 flex items-center justify-center gap-8 sm:gap-10">

                    {/* Pass */}
                    <button
                      onClick={() => handleSwipe(-1)}
                      disabled={swiping}
                      aria-label="Pass profile"
                      className="group flex h-[66px] w-[66px] items-center justify-center rounded-full border border-rose-100 bg-white text-rose-500 shadow-[0_8px_25px_rgba(244,63,94,0.12)] transition duration-200 hover:scale-110 hover:bg-rose-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:h-[76px] sm:w-[76px]"
                    >
                      <X size={31} strokeWidth={2.5} className="transition group-hover:rotate-90" />
                    </button>

                    {/* Like */}
                    <button
                      onClick={() => handleSwipe(1)}
                      disabled={swiping}
                      aria-label="Like profile"
                      className="group relative flex h-[78px] w-[78px] items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-pink-500 to-purple-500 text-white shadow-[0_12px_30px_rgba(236,72,153,0.3)] transition duration-200 hover:scale-110 hover:shadow-[0_15px_35px_rgba(236,72,153,0.4)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:h-[88px] sm:w-[88px]"
                    >
                      <span className="absolute inset-1 rounded-full border border-white/30" />
                      <Heart size={35} fill="white" className="transition group-hover:scale-110" />
                    </button>
                  </div>

                  {/* Swipe Hint */}
                  <div className="mt-5 flex items-center justify-center gap-3 text-xs font-medium text-slate-400">
                    <span className="flex items-center gap-1">
                      <X size={14} className="text-rose-400" />
                      Swipe left to pass
                    </span>
                    <span className="h-1 w-1 rounded-full bg-slate-300" />
                    <span className="flex items-center gap-1">
                      <Heart size={14} className="text-pink-500" />
                      Swipe right to like
                    </span>
                  </div>
                </>
              )}
            </div>
          )}
        </main>
      )}

      {/* ================= MATCHES ================= */}

      {activeTab === "matches" && (
        <main className="matches-page max-w-6xl mx-auto px-4 sm:px-6 py-7 sm:py-10">

          {/* Heading */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">

            <div>
              <span className="text-pink-500 text-xs font-bold uppercase tracking-widest">
                Your connections
              </span>

              <h1 className="text-3xl sm:text-4xl font-black mt-2">
                Your Matches
              </h1>

              <p className="text-gray-500 text-sm mt-2">
                A mutual like is the beginning of a new story.
              </p>
            </div>

            <span className="bg-pink-50 text-pink-600 px-4 py-2.5 rounded-full text-sm font-bold w-fit">
              {matches.length} mutual matches
            </span>
          </div>

          {/* Match Loading */}
          {loading ? (
            <div className="py-20 flex flex-col items-center text-gray-500">
              <RefreshCw className="animate-spin text-pink-500 mb-3" size={30} />
              Loading matches...
            </div>
          ) : matches.length === 0 ? (

            /* Empty Matches */
            <div className="bg-white rounded-[28px] border border-gray-100 shadow-sm text-center py-16 sm:py-24 px-5">

              <div className="w-20 h-20 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center mx-auto mb-5">
                <HeartHandshake size={38} />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold">
                No mutual matches yet
              </h2>

              <p className="text-gray-500 text-sm mt-3 max-w-sm mx-auto leading-relaxed">
                Keep discovering people. When you both like each other,
                your match will appear here.
              </p>

              <button
                onClick={() => goTo("discover")}
                className="mt-6 bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white font-bold rounded-full px-7 py-3.5"
              >
                Discover people
              </button>
            </div>

          ) : (

            /* Match Cards */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

              {matches.map((item) => {
                const profile = item.profile || item;

                return (
                  <motion.div
                    key={getProfileId(profile)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="match-card bg-white rounded-[24px] border border-gray-100 shadow-sm p-4 flex items-center gap-4"
                  >

                    <img
                      src={getProfileImage(profile)}
                      alt={profile.name}
                      className="w-[76px] h-[76px] rounded-2xl object-cover shrink-0"
                    />

                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-base truncate">
                        {profile.name}
                        {profile.age ? `, ${profile.age}` : ""}
                      </h3>

                      {profile.city && (
                        <p className="text-sm text-gray-500 flex items-center gap-1 mt-2 truncate">
                          <MapPin size={14} />
                          {profile.city}
                        </p>
                      )}

                      <p className="text-xs text-pink-500 font-semibold mt-2">
                        <Heart
                          size={12}
                          className="inline mr-1"
                          fill="currentColor"
                        />
                        It's a match!
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </main>
      )}

      {/* ================= MOBILE NAVIGATION ================= */}

      <nav className="mobile-nav fixed lg:hidden bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-100 px-3 pt-2 pb-[max(10px,env(safe-area-inset-bottom))]">
        <div className="max-w-md mx-auto flex justify-around">

          {navigationItems.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => goTo(id)}
              className={`relative min-w-[75px] py-2 flex flex-col items-center gap-1 transition ${activeTab === id
                  ? "text-pink-500"
                  : "text-gray-400"
                }`}
            >
              <Icon size={23} />

              <span className="text-xs font-semibold">
                {label}
              </span>

              {id === "matches" && matches.length > 0 && (
                <span className="absolute top-0 right-3 w-2 h-2 rounded-full bg-pink-500" />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* ================= MATCH POPUP ================= */}

      <AnimatePresence>
        {showMatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="match-dialog bg-white rounded-[30px] p-7 sm:p-9 text-center max-w-sm w-full shadow-2xl"
            >

              {newMatch && (
                <img
                  src={getProfileImage(newMatch)}
                  alt={newMatch.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-pink-100"
                />
              )}

              <div className="w-16 h-16 rounded-full bg-pink-50 text-pink-500 flex items-center justify-center mx-auto">
                <Heart size={35} fill="currentColor" />
              </div>

              <h2 className="text-3xl font-black mt-5">
                It's a match!
              </h2>

              <p className="text-gray-500 mt-2 text-sm">
                You both liked each other.
              </p>

              <button
                onClick={() => {
                  setShowMatch(false);
                  setNewMatch(null);
                }}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90 text-white font-bold rounded-full px-8 py-3.5 mt-7 w-full transition"
              >
                Continue Discovering
              </button>

              <button
                onClick={() => {
                  setShowMatch(false);
                  setNewMatch(null);
                  goTo("matches");
                }}
                className="text-pink-600 text-sm font-bold mt-4"
              >
                View my matches
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
