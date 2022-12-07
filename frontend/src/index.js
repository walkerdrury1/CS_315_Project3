import React from "react";
import ReactDom from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";

import reducers from "./reducers";
import { useEffect } from "react";
const Another = () => {
    useEffect(() => {
        let addScript = document.createElement("script");
        addScript.setAttribute(
            "src",
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        );
        document.body.appendChild(addScript);
        window.googleTranslateElementInit = googleTranslateElementInit;
    }, []);
    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
            {
                pageLanguage: "en",
                layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element"
        );
    };
    return (
        <div>
            <div id = "google_translate_element"></div>
            <App />
        </div>
    );
};
ReactDom.render(
    <Provider store={createStore(reducers)}>
        <Another />
    </Provider>,
    document.querySelector("#root")
);
