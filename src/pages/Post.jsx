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

    const userData = useSelector((state) => state.auth.userData);
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
        <div className="py-8 pt-22">
            <Container>
                <div className="p-4  border rounded-xl bg-gray-50 shadow-lg">
                    <div className="text-center w-full mb-6">
                        <h1 className="p-2 text-xl md:text-2xl font-bold break-words">{post.title}</h1>
                    </div>

                    <div className="w-full flex justify-center mb-4 relative rounded-xl">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-xl w-full max-w-4xl object-cover h-auto"
                        />
                    </div>

                    <div className="prose lg:prose-xl p-2 md:p-4 break-words max-w-full">
                        {parse(post.content)}
                    </div>
                </div>

                {isAuthor && (
                    <div className="flex flex-wrap justify-center mt-6 gap-3">
                        <Link to={`/edit-post/${post.$id}`}>
                            <Button bgColor="bg-green-500" className="w-32 md:w-auto">
                                Edit
                            </Button>
                        </Link>
                        <Button bgColor="bg-red-500" onClick={deletePost} className="w-32 md:w-auto">
                            Delete
                        </Button>
                    </div>
                )}
            </Container>
        </div>
    ) : null;
}
