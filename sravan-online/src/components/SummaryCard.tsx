import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface SummaryCardProps {
    title: string;
    description: string;
}

function SummaryCard({ title, description }: SummaryCardProps) {
    return (
        <Card sx={{ maxWidth: 345, margin: '20px', backgroundColor: '#2C2C2C', borderRadius: 2, boxShadow: 1 }}>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{ color: '#ffffff' }}>
                {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ color: '#ffffff' }}>
                {description}
            </Typography>
        </CardContent>
        </Card>
    );
}
export default SummaryCard;

