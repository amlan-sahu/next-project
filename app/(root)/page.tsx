
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";


export default async function Home({searchParams}: {searchParams: Promise<{query: string}>}) {
  const query = (await searchParams).query || "";

  const params = {search: query|| null};

  const session = await auth();



  const {data:posts} = await sanityFetch({query:STARTUPS_QUERY, params});

  
  // const posts = [
  //   {
  //     _createdAt:new Date(),
  //     views:55,
  //     author:{ _id : 1, name:"Amlan"},
  //     description:'This is a description',
  //     image:'https://totempool.com/wp-content/uploads/2019/08/Startup_a4171014e8d4cfe295a3db794f5389d6_2000.jpg',
  //     category:'Robots',
  //     title:'We Robots'
  //   }
  // ]
  return (
    <>
        <section className="pink_container">
            <h1 className="heading">PITCH YOUR STARTUP, <br/> Connect with Entrepreneurs </h1>
            <p className="sub-heading !max-w-3xl">
              Submit Ideas, Vote on Pitches, and Get Noticed in Virtual Pitch Competitions. <br/>
            </p>
            <SearchForm  query = {query}/>          
        </section>

        <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post:StartupTypeCard)=> (
            <StartupCard key={post?._id} post={post}/>
          ))
          ):(<p className="no-results">No startup found</p>)}
        </ul>
        </section>
        <SanityLive/>
    </>
  );
}
