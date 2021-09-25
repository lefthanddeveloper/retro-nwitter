import "./NweetForm.css";

function NweetForm() {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={onSubmit} className="form_nweet">
        <input
          className="input_text"
          type="text"
          placeholder="What's happening?"
          required
        />
        <input type="submit" />
      </form>
    </div>
  );
}

export default NweetForm;
