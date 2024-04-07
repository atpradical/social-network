import React from "react";
import {Preloader} from "../components/Common/Preloder/Preloader";

export function withSuspense(Component: any) {
        return (props: any) => <React.Suspense fallback={<Preloader/>}>
        <Component {...props}/>
    </React.Suspense>
}