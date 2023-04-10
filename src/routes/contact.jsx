import {Form, useLoaderData, useFetcher} from 'react-router-dom';
import {getContact, updateContact} from '../contacts';

export async function loader({params}) {
  const contact = await getContact(params.contactId);
  if (!contact) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }
  return {contact};
}

export async function action({request, params}) {
  let formData = await request.formData();
  return updateContact(params.contactId, {
    favorite: formData.get('favorite') === 'true',
  });
}

export default function Contact() {
  const {contact} = useLoaderData();

  return (
    <div id="contact" className="contact">
      <div className="contact__avatar">
        <img key={contact.avatar} src={contact.avatar || null} />
      </div>
      <div className="contact__info">
        <h1 className="contact__name">
          {contact.first || contact.last ? (
            <>
              {contact.first} {contact.last}
            </>
          ) : (
            <i>No Name</i>
          )}{' '}
          <Favorite contact={contact} />
        </h1>

        {contact.twitter && (
          <p className="contact__twitter">
            <a target="_blank" href={`https://twitter.com/${contact.twitter}`}>
              {contact.twitter}
            </a>
          </p>
        )}

        {contact.notes && <p className="contact__notes">{contact.notes}</p>}

        <div className="contact__controls">
          <Form action="edit">
            <button type="submit" className="btn btn-edit">
              Edit
            </button>
          </Form>
          <Form
            method="post"
            action="destroy"
            onSubmit={event => {
              if (!confirm('Please confirm you want to delete this record.')) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn btn-delete">
              Delete
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}

function Favorite({contact}) {
  const fetcher = useFetcher();
  let favorite = contact.favorite;
  if (fetcher.formData) {
    favorite = fetcher.formData.get('favorite') === 'true';
  }
  return (
    <fetcher.Form method="post">
      <button
        className="favorite"
        name="favorite"
        value={favorite ? 'false' : 'true'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {favorite ? '★' : '☆'}
      </button>
    </fetcher.Form>
  );
}
