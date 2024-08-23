import { useEffect, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import websocket from '../services/websocket';


const DocumentEditor = () => {
    const { id: documentId } = useParams();
    const [quill, setQuill] = useState(null);

    useEffect(() => {
        const editor = document.createElement('div');
        const q = new Quill(editor, { theme: 'snow' });
        setQuill(q);

        websocket.emit('join-document', documentId);

        websocket.on('load-document', document => {
            q.setContents(document);
            q.enable();
        });

        q.on('text-change', (delta, oldDelta, source) => {
            if (source !== 'user') return;
            websocket.emit('send-changes', delta);
        });

        websocket.on('receive-changes', delta => {
            q.updateContents(delta);
        });

        return () => {
            websocket.off('load-document');
            websocket.off('receive-changes');
        };
    }, [documentId]);

    return (
        <div id="editor-container">
            <div id="quill-container"></div>
        </div>
    );
};

export default DocumentEditor;
