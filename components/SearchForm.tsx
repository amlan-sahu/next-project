import Form from "next/form";
import SearchFromReset from "@/components/SearchFromReset";
import {Search} from "lucide-react";
function SearchForm({query}: {query?: string}) {
    
  return (
    <Form action="/" scroll={false} className="search-form">
      <input
            name="query" 
            defaultValue=""
            placeholder="Search Startup"
            className="search-input"
        />

        <div className="flex gap-2">
            {query && (
                <SearchFromReset />)}
                 <button type="submit" className="search-btn text-white" title="Search">
                    <Search className="size-5" />
                </button>
        </div>


    </Form>
  )
}

export default SearchForm