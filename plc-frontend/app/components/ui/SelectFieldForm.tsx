"use client";

import { Paper, Typography } from "@mui/material";
import { ReactNode } from "react";

interface SidebarCardProps {
    title: string;
    children: ReactNode;
}

export default function SelectFieldForm({
    title,
    children,
}: SidebarCardProps) {
    return (
        <Paper sx={{ p: 2 }}>
            <Typography
                fontWeight={700}
                mb={2}
            >
                {title}
            </Typography>

            {children}
        </Paper>
    );
}