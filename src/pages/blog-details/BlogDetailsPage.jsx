// Wat voor categorie is dit dan? Categorie: hier kijk ik niet meer naar om dus zet meer lekker bovenaan.
import './BlogDetailsPage.css';

// Framework dependencies
import {Link, useParams} from 'react-router-dom';

// Eigen hooks
import useGet from "../../hooks/useGet.jsx";
import useDelete from "../../hooks/useDelete.jsx";

// Components
import BlogDetails from "../../components/blog-details/BlogDetails.jsx";
import Button from "../../components/button/Button.jsx";

function BlogDetailsPage() {
  const {id} = useParams();

  const {data: blog, loading: getLoading, error: getError} = useGet(`/api/blogs/${id}`, !id);
  const {executeDelete, status: deleteStatus} = useDelete(`/api/blogs/${id}`, !id);

  return (
    <div className="inner-container">
      {deleteStatus === 'success' &&
        <div className="blog-details__deleted">
          <span>👋De blogpost is succesvol verwijdert. Klik <Link to='/blogs'>hier</Link> om naar het overzicht te gaan.👋</span>
        </div>
      }

      {deleteStatus === 'error' &&
        <div className="blog-details__deleted">delete error</div>
      }

      {/* Misschien is een status voor de useGet-hook ook handig om dit soort eindeloze conditionele nesting te voorkomen. */}
      {deleteStatus !== 'success' && getLoading ? (
        <div>De details van de blog worden nu opgehaald...</div>
      ) : (getError ? (
          <span className='error-message'>{getError}</span>
        ) : (blog &&
          <div className="blog-details-container">
            <BlogDetails blog={blog}/>
            <Button text="Verwijder blog" variant="danger" handleClick={executeDelete}/>
          </div>
        )
      )}
    </div>
  );
}

export default BlogDetailsPage;