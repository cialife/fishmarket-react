'use client';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";

type InfoCardProps = {
    title: string;
    text: string;
    icon?: React.ReactNode;
    extra?: React.ReactNode;
    className?: string;
}

export default function InfoCard({ title, text, icon = "✦ · ✦ · ✦", extra, className = "" }: InfoCardProps) {
    return (
        <Card className={`info-card h-100 text-center ${className}`.trim()}>
        <Card.Body className="p-4">
            <div className="info-icon mb-3"><h2>{icon}</h2></div>
            {extra}
            <Card.Title as="h2">{title}</Card.Title>
            <hr />
            <Card.Text>{text}</Card.Text>
        </Card.Body>
        </Card>
    );
}