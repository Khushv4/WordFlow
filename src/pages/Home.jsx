import React, {useEffect, useState} from 'react'
import appwriteService from '../appwrite/config'
import { Container, PostCard, Button} from '../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'




function Home() {
  const [posts, setPosts] = useState([])

 const userData = useSelector((state)=>state.auth.userData);
  
   
 
   

  useEffect(()=>{
    appwriteService.getPosts().then((posts)=>{
      if(posts){
        setPosts(posts.documents)
      }
    })
  },[])
  
  if (posts.length === 0){
    return (
      <div className="w-full py-8 mt-4 text-center bg-yellow-50">
        <Container>
          
            <div className=" w-full">
              <h1 className="text-5xl mt-24 font-bold hover:animate-pulse duration-1000">
                Welcome To WordFlow
              </h1>

              <h1 className="px-2 text-2xl mt-10 font-bold hover:text-gray-500 hover:cursor-text ">
                Where Ideas Flow, Stories Grow...
              </h1>

              <Link to={"/login"}>
                <Button className="mt-7 mb-7 bg-amber-400 hover:bg-amber-300 rounded-4xl">
                  Publish Your Blog
                </Button>
              </Link>
            </div>
          
        </Container>

        
      
      
        
      
        
      </div>
    );
  }

  return(
    <div className='flex flex-wrap w-full py-8 pt-20'>
      {posts.map((post)=>(
        <div key={post.$id} className='p-10 content-center max-w-xs'>
          <PostCard {...post}/>
        </div>
      ))}
    </div>
  )

}

export default Home