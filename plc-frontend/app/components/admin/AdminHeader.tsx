'use client';

import { LogOut } from 'lucide-react';
import Link from 'next/link'; 
import { usePathname, useRouter } from 'next/navigation';

export default function AdminHeader() {
    const pathname = usePathname();
    const router = useRouter(); 
    const pathSegments = pathname.split('/').filter(Boolean); 
    const breadcrumbs = pathSegments.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/'); 
        return {
            label: segment.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()),
            href
        };
    }); 
    const pageTitle = breadcrumbs[breadcrumbs.length - 1]?.label || 'Dashboard';
    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/login');
    };
    return (
        <div className="admin-topbar">

            <div> 
                <div className="admin-breadcrumbs">
                    {breadcrumbs.map((crumb, index) => (
                        <span key={crumb.href}>
                            <Link href={crumb.href}>
                                {crumb.label}
                            </Link>
                            {index < breadcrumbs.length - 1 && ' / '}
                        </span>
                    ))}
                </div>
                <h2 id="admin-page-title">
                    {pageTitle}
                </h2>
            </div>

            <div className="admin-topbar-right">


                <div style={{ position: 'relative' }}>
                    <div className="admin-avatar">AD</div>
                </div>

                <button onClick={handleLogout} className="close-admin" title="Close Admin">
                    <LogOut size={18} />
                </button>
            </div>
        </div>
    );
}