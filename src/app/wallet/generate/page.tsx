"use client";

import { useState } from "react";
import {
    Box, Card, CardContent, Typography, TextField, Button, Stack, Alert, CircularProgress, Paper,
} from "@mui/material";
import { ArrowBack as BackIcon, ContentCopy as CopyIcon, CheckCircle as CheckIcon } from "@mui/icons-material";
import { useWalletBalance, generatePin } from "@/hooks/useWallet";
import { useRouter } from "next/navigation";
import { LinksEnum } from "@/utilities/pagesLinksEnum";

export default function GeneratePinPage() {
    const router = useRouter();
    const { wallet, loading: walletLoading, refresh: refreshWallet } = useWalletBalance();

    const [amount, setAmount] = useState("");
    const [generating, setGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatedPin, setGeneratedPin] = useState<{ code: string; amount: string; expires_at: string } | null>(null);
    const [copied, setCopied] = useState(false);

    const balance = wallet ? parseFloat(wallet.balance) : 0;

    const handleGenerate = async () => {
        setError(null);
        const amt = parseFloat(amount);
        if (!amt || amt <= 0) {
            setError("Veuillez entrer un montant valide.");
            return;
        }
        if (amt > balance) {
            setError("Solde insuffisant.");
            return;
        }

        setGenerating(true);
        try {
            const pin = await generatePin(amt);
            setGeneratedPin(pin);
            setAmount("");
            refreshWallet();
        } catch (err: any) {
            setError(err.response?.data?.message || err.message || "Erreur lors de la génération.");
        } finally {
            setGenerating(false);
        }
    };

    const handleCopy = () => {
        if (generatedPin) {
            navigator.clipboard.writeText(generatedPin.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 600, mx: "auto" }}>
            <Button startIcon={<BackIcon />} onClick={() => router.push(LinksEnum.wallet)} sx={{ mb: 3, textTransform: "none", fontWeight: 700 }}>
                Retour au Wallet
            </Button>

            <Typography variant="h4" fontWeight={900} sx={{ mb: 1 }}>Générer un PIN</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Créez un code PIN à usage unique pour un consommateur. Le montant sera débité de votre wallet.
            </Typography>

            {/* Balance Card */}
            <Card sx={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "white", borderRadius: 4, mb: 4 }}>
                <CardContent sx={{ p: 3 }}>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>Solde disponible</Typography>
                    <Typography variant="h4" fontWeight={900}>
                        {walletLoading ? "..." : `$${balance.toLocaleString()}`}
                    </Typography>
                </CardContent>
            </Card>

            {/* Generated PIN Display */}
            {generatedPin && (
                <Paper sx={{ p: 4, mb: 4, borderRadius: 4, bgcolor: "success.50", border: "2px solid", borderColor: "success.main", textAlign: "center" }}>
                    <CheckIcon sx={{ fontSize: 48, color: "success.main", mb: 1 }} />
                    <Typography variant="body1" fontWeight={700} color="success.main" sx={{ mb: 2 }}>PIN généré avec succès !</Typography>
                    <Typography variant="h2" fontWeight={900} fontFamily="monospace" letterSpacing={6} sx={{ mb: 1 }}>
                        {generatedPin.code}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Montant: ${parseFloat(generatedPin.amount).toFixed(2)} • Expire: {new Date(generatedPin.expires_at).toLocaleTimeString()}
                    </Typography>
                    <Button variant="outlined" startIcon={copied ? <CheckIcon /> : <CopyIcon />} onClick={handleCopy} sx={{ textTransform: "none", fontWeight: 700 }}>
                        {copied ? "Copié !" : "Copier le code"}
                    </Button>
                </Paper>
            )}

            {/* Generate Form */}
            <Card sx={{ borderRadius: 4 }}>
                <CardContent sx={{ p: 4 }}>
                    <Stack spacing={3}>
                        <TextField
                            label="Montant (USD)"
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Ex: 50.00"
                            fullWidth
                            inputProps={{ min: 0.01, step: 0.01 }}
                            helperText={`Maximum: $${balance.toFixed(2)}`}
                        />

                        {error && <Alert severity="error">{error}</Alert>}

                        <Button
                            variant="contained"
                            size="large"
                            onClick={handleGenerate}
                            disabled={generating || !amount || parseFloat(amount) <= 0}
                            sx={{ borderRadius: 3, fontWeight: 800, py: 1.5, textTransform: "none", fontSize: "1rem" }}
                        >
                            {generating ? <CircularProgress size={24} color="inherit" /> : "Générer le PIN"}
                        </Button>

                        <Alert severity="info" sx={{ borderRadius: 2 }}>
                            Le PIN est valable <strong>15 minutes</strong>. Si non utilisé, le montant sera automatiquement remboursé sur votre wallet.
                        </Alert>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    );
}
