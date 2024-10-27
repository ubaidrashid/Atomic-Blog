// PostContextProc.js

import React, { createContext, useState } from 'react';
import { faker } from "@faker-js/faker";

const PostContext = createContext();

function createRandomPost() {
    return {
        title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
        body: faker.hacker.phrase(),
    };
}

function PostContextProc({ children }) {
    const [searchQuery, setSearchQuery] = useState("");
    
    const [posts, setPosts] = useState(() =>
        Array.from({ length: 30 }, () => createRandomPost())
    );

    function handleAddPost(post) {
        setPosts((posts) => [post, ...posts]);
    }

    function handleClearPosts() {
        setPosts([]);
    }

    const searchedPosts =
        searchQuery.length > 0
            ? posts.filter((post) =>
                `${post.title} ${post.body}`
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase())
            )
            : posts;

    return (
        <PostContext.Provider value={{
            posts: searchedPosts,
            onClearPosts: handleClearPosts,
            searchQuery: searchQuery,
            setSearchQuery: setSearchQuery,
            onAddPost: handleAddPost
        }}>
            {children}
        </PostContext.Provider>
    );
}

export { PostContext, PostContextProc, createRandomPost };
