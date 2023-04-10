import {useRouteError} from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="error-page">
      <h1>Oops!</h1>
      <p className="error-page__text">
        Sorry, an unexpected error has occurred.
      </p>
      <p className="error-page__text">
        <i className="error-page__info">{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
