import React from 'react'
import {MDCPersistentDrawer, MDCPersistentDrawerFoundation, util} from '@material/drawer/dist/mdc.drawer'
import {Set as ImmutableSet} from 'immutable'
import '@material/drawer/dist/mdc.drawer.css'

export default class PersistentDrawer extends React.PureComponent {
    constructor(props){
        super(props)

        this.state = {
            classNames: new ImmutableSet()
        }

        this.foundation = new MDCPersistentDrawerFoundation({
            addClass: className => this.setState(prevState => ({
                classNames: prevState.classNames.add(className)
            })),
            removeClass: className => this.setState(prevState => ({
                classNames: prevState.classNames.remove(className)
            })),
            hasClass: className => {
                console.log("Has class: " + className);
                console.log(this.refs.root.className.includes(className));
                return this.refs.root.className.includes(className);
            },

            hasNecessaryDom: () => { 
                console.log("Has necessary dom..");
                console.log(this.refs.drawer ? true : false);
                return this.refs.drawer ? true : false; 
            },

            registerInteractionHandler: (evt, handler) => {
                if(this.refs.root){
                    this.refs.root.addEventListener(evt, handler);
                }
            },
            deregisterInteractionHandler: (evt, handler) => {
                if(this.refs.root){
                    this.refs.root.removeEventListener(evt, handler);
                }
            },
            registerDrawerInteractionHandler: (evt, handler) => {
                if(this.refs.drawer){
                    this.refs.drawer.addEventListener(evt, handler);
                }
            },
            deregisterDrawerInteractionHandler: (evt, handler) => {
                if(this.refs.drawer){
                    this.refs.drawer.removeEventListener(evt, handler);
                }
            },
            registerTransitionEndHandler: (handler) => {
                if(this.refs.drawer){
                    this.refs.drawer.addEventListener('transitionend', handler);
                }
            },
            deregisterTransitionEndHandler: (handler) => {
                if(this.refs.drawer){
                    this.refs.drawer.removeEventListener('transitionend', handler);
                }
            },
            registerDocumentKeydownHandler: (handler) => {
                document.addEventListener('keydown', handler);
            },
            deregisterDocumentKeydownHandler: (handler) => {
                document.removeEventListener('keydown', handler);
            },
            getDrawerWidth: () => {
                if(this.refs.drawer){
                    return this.refs.drawer.offsetWidth;
                }
                console.log("Failed to get DrawerWidth [Foundation adapter]");
                return 0;
            },
            setTranslateX: value => {
            },
            getFocusableElements: () => {
                return null;
            },
            saveElementTabState: el => {

            },
            restoreElementTabState: el => {

            },
            makeElementUntabbable: el => {

            },
            notifyOpen: () => {
                /** @todo dispatch event to Store */
            },
            notifyClose: () => {
                /** @todo dispatch event to Store */
            },
            isRtl: () => { 
                return false; 
            },
            isDrawer: el => {
                return (el === this.refs.drawer);
            }

        });
    }

    

    render() {
        const classes = this.state.classNames.toJS().join(' ');
        return (
            <aside ref="root" className={`mdc-persistent-drawer ${classes}`}>
                <nav ref="drawer" className="mdc-persistent-drawer__drawer">
                    {this.props.children}

                    <nav id="icon-with-text-demo" className="mdc-persistent-drawer__content mdc-list">
                    <a className="mdc-list-item mdc-persistent-drawer--selected" href="#">
                        <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">inbox</i>Inbox
                    </a>
                    <a className="mdc-list-item" href="#">
                        <i className="material-icons mdc-list-item__start-detail" aria-hidden="true">star</i>Star
                    </a>
                    </nav>
                </nav>
            </aside>
        );
    }

    componentDidMount() {
        this.foundation.init();
    }
    componentWillUnmount(){
        this.foundation.destroy();
    }
}