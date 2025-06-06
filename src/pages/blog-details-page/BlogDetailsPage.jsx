import './BlogDetailsPage.css';

import {useParams} from 'react-router-dom';

function BlogDetailsPage() {
  const { id } = useParams();

  return (<>
    <h1>Blog detail pagina</h1>
    <p>id: {id}</p>
  </>);
}

export default BlogDetailsPage;