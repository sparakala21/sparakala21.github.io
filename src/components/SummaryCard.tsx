import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

interface SummaryCardProps {
    title: string;
    description: string;
    link?: string;
}

function SummaryCard({ title, description, link }: SummaryCardProps) {
    const cardContent = (
        <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{ color: '#ffffff' }}>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ color: '#ffffff' }}>
                {description}
            </Typography>
        </CardContent>
    );
    const cardStyle = {
        maxWidth: 345, 
        margin: '20px', 
        backgroundColor: '#2C2C2C', 
        borderRadius: 2, 
        boxShadow: 1
    };
    if (link) {
        return (
            <Link href={link} passHref style={{ textDecoration: 'none' }}>
                <Card sx={cardStyle}>
                    <CardActionArea>
                        {cardContent}
                    </CardActionArea>
                </Card>
            </Link>
        );
    }
    return (
        <Card sx={cardStyle}>
            {cardContent}
        </Card>
    );
}

export default SummaryCard;