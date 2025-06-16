import './BlogsOverviewPage.css';

// Eigen hooks
import useGet from "../../hooks/useGet.jsx";

// Components
import BlogListItem from "../../components/blog-list-item/BlogListItem.jsx";

function BlogsOverviewPage() {
  const {data: blogs, getLoading, getError} = useGet('/api/blogs');

  /*
    Normaal zal ik de "APIBaseURL" gebruiken, maar ik had cors problemen met de NOVI Dynamic API.
    Volgens mij staan de cors instellingen van de server nog niet helemaal goed.
    De oplossing was om een proxy te gebruiken zodat de cors problemen niet optreden doordat de communicatie server > server is.
    Alle calls naar /api/... worden door de proxy opgevangen en doorgestuurd naar de NOVI Dynamic API.
    Dit staat geconfigureerd in vite.config.js.
    De variabelen hieronder staan uitgecommentarieerd omdat ze niet gebruikt worden in dit bestand.
  */
  // const APIBaseURL = 'https://novi-backend-api-wgsgz.ondigitalocean.app/api';
  // const APIProjectIDHeader = {'Novi-Education-Project-Id': 'ec0bf4cc-4e94-4807-8041-d95b0731722b'};

  /*
    updateBlogById is voor nu uitgecommentarieerd omdat de getBlogById functie verhuist is.
    updateBlogById was afhankelijk van de getBlogById functie om de eerste blog op te halen.
    De code staat hier nog omdat deze voor een opdracht geschreven moest worden.
  */
  // async function updateBlogById(id) {
  //   try {
  //     // Voor de opdracht wordt nu de eerste blog gebruikt.
  //     const firstBlog = await getBlogById(1);
  //     firstBlog.subtitle = 'Updated!';
  //
  //     const response = await axios.put(`/api/blogs/${firstBlog.id}`, firstBlog, {
  //       headers: {
  //         ...APIProjectIDHeader
  //       }
  //     });
  //
  //     console.log(`Blog id: ${response.data.id} is succesvol geüpdatet!`);
  //     console.log(response);
  //   } catch (e) {
  //     console.error(`Blog kon niet worden geüpdatet!`)
  //     console.error(e);
  //   }
  // }

  return (
    <div className="inner-container">
      {getLoading ? (
        <div>Alle blogs worden nu opgehaald...</div>
      ) : (getError ? (
          <span className="error-message">{getError}</span>
        ) : (blogs &&
          <div className="blog-overview">
            <h1>Bekijk alle {blogs.length} blogs op het platform</h1>
            {blogs && blogs.map(blog => <BlogListItem key={blog.id} blog={blog}/>)}
          </div>
        )
      )}
    </div>
  );
}

export default BlogsOverviewPage;