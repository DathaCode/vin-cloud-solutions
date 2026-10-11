import React from 'react';
import {
    Sparkles, Code2, Cloud, Compass, Workflow, Package, Bot, Database, LineChart, ScanEye,
    KeyRound, Building2, MessagesSquare, Plug, Zap, GitBranch, Search, PenTool, Hammer, Rocket,
    RefreshCw, Layers, ShieldCheck, TrendingDown, Handshake,
    Users, Contact, Smartphone, LayoutDashboard, Inbox, GitMerge, Kanban, Award, Target, Wand2, ListChecks,
    MessageCircle, MessageSquareText, PhoneCall, ScanLine, Video, FileSignature, CloudDownload, Languages,
    ShoppingBag, Home, Car, GraduationCap, Landmark, HeartPulse, Hotel, Briefcase, Boxes,
} from 'lucide-react';

// Content in constants.js refers to icons by name; this keeps that mapping in one place.
const ICONS = {
    Sparkles, Code2, Cloud, Compass, Workflow, Package, Bot, Database, LineChart, ScanEye,
    KeyRound, Building2, MessagesSquare, Plug, Zap, GitBranch, Search, PenTool, Hammer, Rocket,
    RefreshCw, Layers, ShieldCheck, TrendingDown, Handshake,
    Users, Contact, Smartphone, LayoutDashboard, Inbox, GitMerge, Kanban, Award, Target, Wand2, ListChecks,
    MessageCircle, MessageSquareText, PhoneCall, ScanLine, Video, FileSignature, CloudDownload, Languages,
    ShoppingBag, Home, Car, GraduationCap, Landmark, HeartPulse, Hotel, Briefcase, Boxes,
};

const Icon = ({ name, ...props }) => {
    const Component = ICONS[name] || Sparkles;
    return <Component aria-hidden="true" {...props} />;
};

export default Icon;
