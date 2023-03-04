const MessageBox = (props) => {
  const messages = props.messages || [];

  if (messages.length < 1) {
    return <></>;
  }
  const success = messages.length === 1 && messages[0].includes("success");
  return (
    <div
      className={`pa2 dib f4 br3 measure center ${
        success ? "bg-green" : "bg-red"
      }`}
    >
      <ul className="list pa2">
        {messages.map((msg, ix) => (
          <li key={ix} className="pa1">
            {msg}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageBox;
