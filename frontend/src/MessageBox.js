const MessageBox = (props) => {
  const messages = props.messages || [];
  const type = props.type || "alert";

  if (messages.length < 1) {
    return <></>;
  }
  return (
    <div className="pt0 pb2">
      <ul className="ml2 measure center">
        {messages.map((msg, ix) => (
          <li className="lh-copy pv1 ba bl-0 bt-0 br-0 b--dotted b--black-30">
            {msg}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MessageBox;
