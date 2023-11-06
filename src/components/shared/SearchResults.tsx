import { Models } from 'appwrite';
import Loader from './Loader';
import GridPostList from './GridPostList';

type TypeSearchedPosts = {
  documents: Models.Document[]
  total: number,
}

type SearchResultsProps = {
  searchedPosts: TypeSearchedPosts;
  isSearchFetching: boolean;
};

const SearchResults = ({
  searchedPosts,
  isSearchFetching,
}: SearchResultsProps) => {
    
  if (isSearchFetching) return <Loader />;

  if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  }

  return (
    <span className='text-light-4 mt-10 text-center w-full'>
      No Results Found...
    </span>
  );
};

export default SearchResults;
