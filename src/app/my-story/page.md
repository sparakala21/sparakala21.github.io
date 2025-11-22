"use client";

import * as React from 'react';
import Image from 'next/image';
import { Box, Typography } from '@mui/joy';

import { useTheme } from '@mui/joy'
export default function Story() {
    const theme = useTheme();
    return (
        <>
        <Box 
        sx={{ 
            backgroundColor: theme.palette.success[600], 
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center'
        }}
        >
            <Box 
                sx={{ 
                backgroundColor: theme.palette.neutral[300],
                width: '960px', 
                minHeight: '100vh',
                px: { xs: 2, sm: 3, md: 4 },
                py: 4, 
                textAlign: 'center'
                }}
            >
                <Typography
                level='h2'
                sx={{
                    mb: 5
                }}>
                    A brief overview
                </Typography>

                <Typography
                level='body-md'
                sx={{
                    mb: 5
                }}>
                    This isn't a page accessible by any other page or component of this site. That is by design. I wanted to document my journey in a way that is public enough to keep me accountable and private enough to be safe.
                </Typography>

                <Image
                src="/me/va.jpg"
                height={893}
                width={1190}
                
                alt='my family'/>

                <Typography
                level='body-md'
                sx = {{
                    mt: 5,
                    mb: 5
                }}>
                    I was born in Virginia in 2003 to 2 immigrant parents. One of whom only had 3 years of living in the US on me.
                    I didn't learn table manners until a lady at my cafeteria taught me. I learned english with an accent the way all my other cousins did.
                    I read Hanuman Chalisa everyday. I eventually played soccer and baseball for 2 years and then I left in 2010. Fun Fact: this stint remains the longest I have ever lived in one place.
                </Typography>

                <Image
                src="/me/hyd.JPG"
                height={893}
                width={1190}
                
                alt='hyderabad'/>

                <Typography
                level='body-md'
                sx = {{
                    mt: 5,
                    mb: 5
                }}>
                    For a series of important reasons, my family moved to Hyderabad, India. Obviously a lot of change. For starters my extended family was no longer thousands of miles away. In third grade I was already two years behind in Hindi and Telugu, but I coasted for the next few years in math and english.
                    It's hot and wet during the monsoon and hot and dry during what they cruelly called "winter". You were allowed on the terrace of almost every building. My new neighbors played a new game called Cricket. They played it everywhere, in living rooms, on the street, in the park, on the terraces, they even played in the back of the classroom.
                    I didnt know then, but cricket would become a lifetime obsession and my favorite way to stay connected to what will soon become my city. History class was still about British Imperialism though. Notable obsessions include: rubiks cubes, Cricket Attax cards, piano, and my Nintendo DS
                </Typography>

                <Image
                src="/me/pa.JPG"
                height={893}
                width={1190}
                
                alt='us'/>

                <Typography
                level='body-md'
                sx = {{
                    mt: 5,
                    mb: 5
                }}>
                    Due to some changing circumstances, my mom renewed her costco card, found an apartment and moved us all to Pennsylvania. 
                    I didn't like this nearly as much as Hyderabad and I was recovering from some . I left a lot of my closest friends there.
                    I also came in with the assumption that I would make friends like I have always have. American middle school had other plans. 
                    I always wondered why those kids didn't like me. Was it because I was fat? Was it because I was Indian? Was it both? Was it something else entirely?
                    In retrospect the answer is clear: I wasn't ready to try yet. 
                </Typography>

                <Image
                src="/me/water.jpg"
                height={893}
                width={1190}
                
                alt='ask me the story of this picture next time you see me :)'/>

                <Typography
                level='body-md'
                sx = {{
                    mt: 5,
                    mb: 5
                }}>
                    Once middle school was done, I felt I was done crashing and burning. Thanks to some wisdom from my Uncle I joined our club rowing team. 
                    In true Indian uncle logic, the entire rationale was sports can improve college apps and rowing is one of a few sports you only start in high school.
                    I started showing up and working out. I talked to people outside of class. People started following me on Instagram and saying hi in the hallways.
                    My grades definitely did not thrive as a result of rowing, but they never thrived. I went from middle of the road and no friends to middle of the road and friends.
                    I had the privilege of captaining for a bit. If there was any bump in responsibility I felt it long before anyone named me captain.
                    I am really proud of that team and I carry those lessons forward with me through the rest of my life. New obsessions: Rowing, Lifting, and Encouraging.
                </Typography>

                <Image
                src="/me/chess.jpg"
                height={893}
                width={1190}
                
                alt='we were corny in high school'/>
                <Typography
                level='body-md'
                sx = {{
                    mt: 5,
                    mb: 5
                }}>
                    Covid obviously made rowing hard. I ended up losing my connection to people again, but this time it didn't effect me. Years of social isolation meant that I didn't need friends as much. I just needed an outlet for my emotions.
                    luckily for me my friend started playing chess with me during lunch.(for no other reason than to beat me over and over) I started learning out of spite and then I practiced because it made me feel amazing to get better.
                    New Obsessions: Chess and Chess Analysis
                </Typography>

                <Image
                src="/me/move-in.jpg"
                height={893}
                width={1190}
                
                alt='Mustache bad'/>

                <Typography
                level='body-md'
                sx = {{
                    mt: 5,
                    mb: 5
                }}>
                    I graduated and decided I needed a change of scenery without moving too far away. I went to a college that I only learned of a few months before applying. My favorite classes in high school were AP comp sci, intro to Java and intro to Python so I thought computer science would hit the spot.
                    
                </Typography>

                



                


            </Box>

        </Box>
        </>
    );
}