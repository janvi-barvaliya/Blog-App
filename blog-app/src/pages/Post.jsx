
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import appwriteService from "../appwrite/config"
import Button from "../components/Button"
import Container from "../components/container/Container"
import parse from "html-react-parser"
import { useSelector } from "react-redux"

function Post() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = post && userData ? post.userId === userData.$id : false


  useEffect(() => {
    if (!userData) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug, navigate, userData]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/")
      }
    })
  }

  if (!userData) {
    return (
        <div className="text-center text-lg font-semibold">
            Please <Link to="/login" className="text-blue-500">login</Link> to read this post.
        </div>
    );
}

  return post ? (
    <div className="py-8">
      <Container>
        {/* Post Container */}
        <div className="w-full flex flex-col items-center border rounded-xl p-2 relative max-w-3xl mx-auto bg-white shadow-lg">

          {/* Image Container */}
          <div className="w-full max-h-[500px] overflow-hidden rounded-lg">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          {/* Post Content */}
          <div className="w-full p-4 text-center">
            <h1 className="text-2xl font-bold mb-2">{post.title}</h1>
            <div className="browser-css">{parse(post.content)}</div>
          </div>

          {/* Edit & Delete Buttons at the Bottom */}
          {isAuthor && (
            <div className="w-full flex justify-center gap-4 mt-4 p-2 border-t">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </Container>
    </div>
  ) : null
}

export default Post
