import React from "react";

import { Stack, Typography} from "@mui/material";




const NoteCard = ({ note }) => {
    const isHard = Number(note.complexity) >= 8
    return (
        <Stack
            direction="column"
            spacing={0.5}
            sx={{
                width: '90%',
                borderRadius: 2,
                padding: 1.5,
                bgcolor: isHard ? '#ff6b6b' : '#7dd3fc',
                color: '#0f172a'
            }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography fontWeight={700}>{note.title}</Typography>
                {note.date ? (
                    <Typography variant="caption" sx={{ opacity:0.8}}>
                        {note.date}
                        </Typography>
                ) : null}
            </Stack>

            {note.description ? (
                <Typography variant="body2" sx={{ opacity: 0.95}}>
                    {note.description}
                </Typography>
            ) : null}
        </Stack>
    )
}

export default NoteCard