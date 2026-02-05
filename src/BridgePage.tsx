import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const BridgePage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const orgId = searchParams.get('org');
        const userId = searchParams.get('user');

        if (orgId && userId) {
            // 1. Save the data to the CRM's local storage
            localStorage.setItem('crm_context', JSON.stringify({
                organizationId: orgId,
                userId: userId
            }));
            
            console.log("Bridge: Context saved locally.");
        }

        // 2. SCRUB THE URL: Redirect to the actual auth callback 
        // with NO query parameters.
        navigate('/api/auth/callback', { replace: true });
    }, [searchParams, navigate]);

    return <div>Connecting to CRM...</div>; // Only visible for a split second
};