import type { IState } from "../interface";

function Preview(props: { currentState: IState }) {
  return (
    <div className="json-display-container">
      <pre>
        <code>{JSON.stringify(props.currentState, null, 2)}</code>
      </pre>
    </div>
  );
}

export default Preview;
