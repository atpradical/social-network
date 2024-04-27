import React from "react";
import {Preloader} from "../components/Common/Preloder/Preloader";

export function withSuspense<WCP>(WrappedComponent: React.ComponentType<WCP>) {
        return (props: WCP) => <React.Suspense fallback={<Preloader/>}>
        <WrappedComponent {...props}/>
    </React.Suspense>
}