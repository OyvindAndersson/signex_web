import React from 'react'
import {MDCToolbar, MDCToolbarFoundation} from '@material/toolbar';
import {Set as ImmutableSet} from 'immutable'

export default class Toolbar extends React.PureComponent {
    constructor(props){
        super(props)

        this.state = {
            classNames: new ImmutableSet()
        }

        this.foundation = new MDCToolbarFoundation({
            /** Checks if the root element of the component has the given className. */
            hasClass: className => {
                return this.refs.root.className.includes(className);
            },
            /** Adds a class to the root element of the component. */
            addClass: className => this.setState(prevState => ({
                classNames: prevState.classNames.add(className)
            })),
            /** Removes a class from the root element of the component. */
            removeClass: className => this.setState(prevState => ({
                classNames: prevState.classNames.remove(className)
            })),
            /** Registers a handler to be called when user scrolls. 
             * Our default implementation adds the handler as a listener to the window’s scroll event. */
            registerScrollHandler: handler => {

            },
            /** Unregisters a handler to be called when user scrolls. 
             * Our default implementation removes the handler as a listener to the window’s scroll event. */
            deregisterScrollHandler: handler => {

            },
            /** Registers a handler to be called when the surface (or its viewport) resizes. 
             * Our default implementation adds the handler as a listener to the window’s resize event. */
            registerResizeHandler: handler => {

            },
            /** Unregisters a handler to be called when the surface (or its viewport) resizes. 
             * Our default implementation removes the handler as a listener to the window’s resize event. */
            deregisterResizeHandler: handler => {

            },
            /** Gets viewport (window) width. */
            getViewportWidth: () => {
                var w = window,
                e = document.documentElement,
                g = document.getElementsByTagName('body')[0],
                x = w.innerWidth || e.clientWidth || g.clientWidth;

                return x;
            },
            /** Gets the number of pixels that the content of body is scrolled upward. */
            getViewportScrollY: () => { 
                return 0; 
            },
            /** Gets root element mdc-toolbar offsetHeight. */
            getOffsetHeight: () => {
                return 0;
            },
            /** Gets first row element offsetHeight. */
            getFirstRowElementOffsetHeight: () => {
                return 0;
            },
            /** Broadcasts an event with the remaining ratio of flexible space. */
            notifyChange: evtData => {

            },
            /** Sets mdc-toolbar style property to provided value. */
            setStyle: (prop, value) => {

            },
            /** Sets mdc-toolbar__title style property to provided value. */
            setStyleForTitleElement: (prop, value) => {

            },
            /** Sets flexible row element style property to provided value. */
            setStyleForFlexibleRowElement: (prop, value) => {

            },
            /** Sets mdc-toolbar-fixed-adjust style property to provided value. */
            setStyleForFixedAdjustElement: (prop, value) => {
                // mdc-toolbar-fixed-adjust
            }
        });
    }

    /**
     * Initialize component
     */
    componentDidMount(){
        this.foundation.init();
    }

    /**
     * Destroy component
     */
    componentWillUnmount(){
        this.foundation.destroy();
    }

    /**
     * sets AdjustElement proper margin-top.
     */
    updateAdjustElementStyles() {

    }

    /**
     * Renders component
     */
    render(){
        return(
            <header ref="root" className={`mdc-toolbar ${this.state.classNames.toJS().join(' ')}`}>
                <div className="mdc-toolbar__row">
                </div>
            </header>
        );
    }
}