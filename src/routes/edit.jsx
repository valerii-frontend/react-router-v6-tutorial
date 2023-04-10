import {Form, useLoaderData, redirect, useNavigate} from 'react-router-dom';
import {updateContact} from '../contacts';

export async function action({request, params}) {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateContact(params.contactId, updates);
  return redirect(`/contacts/${params.contactId}`);
}

export default function EditContact() {
  const {contact} = useLoaderData();
  const navigate = useNavigate();

  return (
    <Form method="post" id="contact-form" className="edit">
      <div className="edit__item">
        <span>Name</span>
        <input
          placeholder="First"
          aria-label="First name"
          type="text"
          name="first"
          defaultValue={contact.first}
        />
        <input
          placeholder="Last"
          aria-label="Last name"
          type="text"
          name="last"
          defaultValue={contact.last}
        />
      </div>
      <div className="edit__item">
        <label htmlFor="twitter">Twitter</label>
        <input
          type="text"
          name="twitter"
          placeholder="@jack"
          defaultValue={contact.twitter}
        />
      </div>
      <div className="edit__item">
        <label htmlFor="avatar">Avatar URL</label>
        <input
          placeholder="https://example.com/avatar.jpg"
          aria-label="Avatar URL"
          type="text"
          name="avatar"
          defaultValue={contact.avatar}
        />
      </div>
      <div className="edit__item">
        <label htmlFor="notes">Notes</label>
        <textarea name="notes" defaultValue={contact.notes} rows={6} />
      </div>
      <div className="edit__controls">
        <button type="submit" className="btn">
          Save
        </button>
        <button
          type="button"
          className="btn btn-delete"
          onClick={() => navigate(-1)}
        >
          Cancel
        </button>
      </div>
    </Form>
  );
}
