import React from 'react';

import { ReactComponent as AWSIcon } from 'devicon/icons/amazonwebservices/amazonwebservices-original.svg';
import { ReactComponent as AndroidIcon } from 'devicon/icons/android/android-original.svg';
import { ReactComponent as AngularJSIcon } from 'devicon/icons/angularjs/angularjs-original.svg';
import { ReactComponent as BootstrapIcon } from 'devicon/icons/bootstrap/bootstrap-plain.svg';
import { ReactComponent as CIcon } from 'devicon/icons/c/c-original.svg';
import { ReactComponent as CPlusPlusIcon } from 'devicon/icons/cplusplus/cplusplus-original.svg';
import { ReactComponent as CsharpIcon } from 'devicon/icons/csharp/csharp-original.svg';
import { ReactComponent as Css3Icon } from 'devicon/icons/css3/css3-original.svg';
import { ReactComponent as D3JsIcon } from 'devicon/icons/d3js/d3js-plain.svg';
import { ReactComponent as DjangoIcon } from 'devicon/icons/django/django-plain.svg';
import { ReactComponent as DockerIcon } from 'devicon/icons/docker/docker-original.svg';
import { ReactComponent as DotNetIcon } from 'devicon/icons/dot-net/dot-net-original.svg';
import { ReactComponent as ElectronIcon } from 'devicon/icons/electron/electron-original.svg';
import { ReactComponent as ExpressIcon } from 'devicon/icons/express/express-original.svg';
import { ReactComponent as Html5Icon } from 'devicon/icons/html5/html5-original.svg';
import { ReactComponent as JavaIcon } from 'devicon/icons/java/java-original.svg';
import { ReactComponent as JavascriptIcon } from 'devicon/icons/javascript/javascript-plain.svg';
import { ReactComponent as JQueryIcon } from 'devicon/icons/jquery/jquery-original.svg';
import { ReactComponent as MongoDBIcon } from 'devicon/icons/mongodb/mongodb-original.svg';
import { ReactComponent as MySQLIcon } from 'devicon/icons/mysql/mysql-original.svg';
import { ReactComponent as NodeJSIcon } from 'devicon/icons/nodejs/nodejs-original.svg';
import { ReactComponent as PythonIcon } from 'devicon/icons/python/python-original.svg';
import { ReactComponent as ReactIcon } from 'devicon/icons/react/react-original.svg';
import { ReactComponent as ReduxIcon } from 'devicon/icons/redux/redux-original.svg';
import { ReactComponent as TypescriptIcon } from 'devicon/icons/typescript/typescript-original.svg';
import { ReactComponent as VisualStudioIcon } from 'devicon/icons/visualstudio/visualstudio-plain.svg';
import { ReactComponent as VueJSIcon } from 'devicon/icons/vuejs/vuejs-original.svg';
import {} from 'devicon/icons/vuejs/vuejs-original.svg';

export const iconSelector = (name, props = { width: 60, height: 60 }) => {
    // Convert skill name to lowercase & remove whitespace
    const skillName = name.toLowerCase().replace(/\s/g, '');
    if (skillName.includes('aws') || skillName === 'amazonwebservices') {
        return <AWSIcon {...props} />;
    } else if (skillName.includes('android')) {
        return <AndroidIcon {...props} />;
    } else if (skillName.includes('angular')) {
        return <AngularJSIcon {...props} />;
    } else if (skillName.includes('bootstrap')) {
        return <BootstrapIcon {...props} />;
    } else if (skillName === 'c') {
        return <CIcon {...props} />;
    } else if (skillName === 'cplusplus' || skillName.includes('c++')) {
        return <CPlusPlusIcon {...props} />;
    } else if (skillName === 'csharp' || skillName.includes('c#') || skillName.includes('csharp')) {
        return <CsharpIcon {...props} />;
    } else if (skillName.includes('css')) {
        return <Css3Icon {...props} />;
    } else if (skillName.includes('d3')) {
        return <D3JsIcon {...props} />;
    } else if (skillName.includes('react')) {
        return <ReactIcon {...props} />;
    } else if (skillName.includes('django')) {
        return <DjangoIcon {...props} />;
    } else if (skillName.includes('docker')) {
        return <DockerIcon {...props} />;
    } else if (skillName.includes('dotnet') || skillName.includes('.net')) {
        return <DotNetIcon {...props} />;
    } else if (skillName.includes('electron')) {
        return <ElectronIcon {...props} />;
    } else if (skillName.includes('express')) {
        return <ExpressIcon {...props} />;
    } else if (skillName.includes('html')) {
        return <Html5Icon {...props} />;
    } else if (skillName.includes('java') && !skillName.includes('javascript')) {
        return <JavaIcon {...props} />;
    } else if (skillName.includes('javascript')) {
        return <JavascriptIcon {...props} />;
    } else if (skillName.includes('jquery')) {
        return <JQueryIcon {...props} />;
    } else if (skillName.includes('mongo')) {
        return <MongoDBIcon {...props} />;
    } else if (skillName.includes('mysql')) {
        return <MySQLIcon {...props} />;
    } else if (skillName.includes('node')) {
        return <NodeJSIcon {...props} />;
    } else if (skillName.includes('python')) {
        return <PythonIcon {...props} />;
    } else if (skillName.includes('redux')) {
        return <ReduxIcon {...props} />;
    } else if (skillName.includes('typescript')) {
        return <TypescriptIcon {...props} />;
    } else if (skillName.includes('visualstudio')) {
        return <VisualStudioIcon {...props} />;
    } else if (skillName.includes('vue')) {
        return <VueJSIcon {...props} />;
    }
    return <div>{name}</div>;
};
