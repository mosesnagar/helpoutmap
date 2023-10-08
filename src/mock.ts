import { Volunteer } from "./volunteer";

export const mockData: Volunteer[] = [
    {
        id: "1",
        location: { lat: 32.487294, lng: 34.980627 },
        title: "Volunteer Opportunity 1",
        description: "This is a description.",
        contact: "Contact info",
        link: "https://www.google.com",
        tags: ["tag1", "tag2", "tag3", "tag4"],
        image: "https://picsum.photos/200/300",
        createdAt: new Date(),
    },
    {
        id: "2",
        location: { lat: 32.336936, lng: 34.866838 },
        title: "Volunteer Opportunity 2",
        description: "This is a description.",
        contact: "Contact info",
        link: "https://www.google.com",
        tags: ["tag2"],
        image: "https://picsum.photos/200/300",
        createdAt: new Date(),
    },
    {
        id: "3",
        location: { lat: 31.785558, lng: 34.649423 },
        title: "Volunteer Opportunity 3",
        description: "This is a description.",
        contact: "Contact info",
        link: "https://www.google.com",
        tags: ["tag1", "tag2"],
        image: "https://picsum.photos/200/300",
        createdAt: new Date(),
    },
];
