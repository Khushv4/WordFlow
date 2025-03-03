import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData)
    
   

    const isAuthor = post && userData ? post.userId === userData.$id : false;
    
  

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8">
            <Container>
            <div className=" p-4 border rounded-xl">
            <div className=" text-center w-full mb-6">
                
                    <h1 className="p-4 text-2xl font-bold">{post.title}</h1>
                </div>
                <div className=" w-s flex justify-center mb-4 relative  rounded-xl ">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="p-4 rounded-xl w-s h-xl"
                    />

                    
                </div>
                
                <div className="browser-css p-4">
                    {parse(post.content)}
                    </div>
                    </div>

                    {isAuthor && (
                        <div className="">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
            </Container>
            
        </div>
    ) : null;
}