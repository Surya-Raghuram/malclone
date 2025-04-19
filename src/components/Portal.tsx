import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function Portal({ children }: { children: React.ReactNode }) {
    const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

    useEffect(()=>{
        const element = document.getElementById('portal-root');
        setPortalElement(element);
    }, []);
    return portalElement ? ReactDOM.createPortal(children, portalElement) : null;
}

export default Portal;
