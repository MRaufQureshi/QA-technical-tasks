// API request payload
import {data} from "../../data";
import axios from "axios";

let payload = JSON.stringify({
    "data": {
        "content": "I'm a sticky note Fritz",
        "shape": "square"
    },
    "style": {
        "fillColor": "light_yellow",
        "textAlign": "center",
        "textAlignVertical": "top"
    },
    "position": {
        "x": 400,
        "y": 0,
        "origin": "center"
    }
});

// API request configuration

let config = {
    method: 'post',
    url: `https://api.miro.com/v2/boards/${data.boardId}/sticky_notes`,
    headers: {
        'Authorization': 'Bearer {token}'.replace('{token}',data.bearer),
        'Content-Type': 'application/json'
    },
    data: payload
}

// Call create sticky endpoint:
export async function createSticky(){
    try {
        let response = await axios(config);
        const stickyId = JSON.stringify(response.data.id);
        return stickyId;
    } catch (err) {console.log(`ERROR: ${err}`)}
}
