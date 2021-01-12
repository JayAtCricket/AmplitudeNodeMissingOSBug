import "./App.css";
import * as NodeAmplitudeSDK from "@amplitude/node";
import * as ClientsideAmplitudeSDK from "amplitude-js";
import { useEffect } from "react";

const amplitudeProjectKey = "YOUR PROJECT API KEY HERE";

let nodeAmplitudeSDK;
let clientSideAmplitudeSDK;

function App() {
  useEffect(() => {
    clientSideAmplitudeSDK = ClientsideAmplitudeSDK.getInstance();
    clientSideAmplitudeSDK.init(amplitudeProjectKey);
    nodeAmplitudeSDK = NodeAmplitudeSDK.init(amplitudeProjectKey);
  }, []);

  const handleNodeSDKClick = () => {
    const device_id = clientSideAmplitudeSDK.options.deviceId.toString();
    const session_id = clientSideAmplitudeSDK.getSessionId().toString();

    nodeAmplitudeSDK.logEvent({
      event_type: "node library event",
      device_id,
      session_id,
    });
  };
  const handleClientSDKClick = () => {
    console.log(JSON.stringify(clientSideAmplitudeSDK, null, 4));

    clientSideAmplitudeSDK.logEvent("client-side library event");
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>Current Project API Key: {amplitudeProjectKey}</div>
        <button onClick={handleClientSDKClick}>
          Log event with <strong>client-side</strong> SDK
        </button>
        <button onClick={handleNodeSDKClick}>
          Log event with <strong>node</strong> SDK
        </button>
      </header>
    </div>
  );
}

export default App;
