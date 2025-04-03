import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import Container from "../components/container/Container";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";

function Home() {
    const [posts, setPosts] = useState([]);
    const userData = useSelector((state) => state.auth.userData); // Check if user is logged in

    useEffect(() => {
        if (userData) {
            appwriteService.getPosts().then((posts) => {
                if (posts) setPosts(posts.documents);
            });
        }
    }, [userData]); // Fetch posts only if user is logged in

    return (
        <div className="w-full py-8">
            <Container>
                {/* 🔹 If user is NOT logged in, show login message */}
                {!userData ? (
                    <div className="text-center text-xl font-semibold text-gray-700">
                        Please <Link to="/login" className="text-blue-500">login</Link> to read posts.
                    </div>
                ) : (
                    <div className="flex flex-wrap">
                        {posts.length === 0 ? (
                            <h1>No posts available</h1>
                        ) : (
                            posts.map((post) => (
                                <div className="p-2 w-1/4" key={post.$id}>
                                    <PostCard {...post} />
                                </div>
                            ))
                        )}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Home;
