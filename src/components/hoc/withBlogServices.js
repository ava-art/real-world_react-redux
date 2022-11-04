import React from "react";
import { BlogServiceConsumer } from "../blog-service-context/blog-service-context";


const withBlogServices = () => (Wrapped) =>{

  return (props) =>{
    return (
      <BlogServiceConsumer>
        {
          (articlesStoreServices) =>{
           return(
             <Wrapped {...props}  articlesStoreServices={articlesStoreServices} />
           ) 
          }
        }
      </BlogServiceConsumer>
    )
  }

}

export default withBlogServices