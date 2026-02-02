"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardContent,
  IconButton,
  Button,
  TextField,
  Grid,
  MenuItem,
  Breadcrumbs,
} from "@mui/material";
import {
  ArrowBack as BackIcon,
  Save as SaveIcon,
  Receipt as OrderIcon,
  Home as HomeIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { LinksEnum } from "@/utilities/pagesLinksEnum";

export default function OrderEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const decodedId = decodeURIComponent(id);

  const [formData, setFormData] = useState({
    status: "Pending",
    total: "124.50",
    notes: "Customer requested delivery after 5 PM.",
  });

  const handleSave = () => {
    console.log("Saving order:", formData);
    router.push(`/orders/${encodeURIComponent(decodedId)}`);
  };

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Breadcrumbs Header */}
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs
          separator={
            <ChevronRightIcon
              sx={{ fontSize: "1rem", color: "text.disabled" }}
            />
          }
          aria-label="breadcrumb"
          sx={{ mb: 3 }}
        >
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <HomeIcon
              sx={{ mr: 0.5, fontSize: "1.2rem", color: "primary.main" }}
            />
            <Typography
              variant="body2"
              fontWeight="500"
              sx={{ color: "text.secondary" }}
            >
              Home
            </Typography>
          </Box>
          <Link
            href={LinksEnum.orders}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Typography
              variant="body2"
              fontWeight="500"
              sx={{
                color: "text.secondary",
                "&:hover": { color: "primary.main" },
              }}
            >
              Orders
            </Typography>
          </Link>
          <Typography variant="body2" fontWeight="600" color="text.primary">
            Edit Order
          </Typography>
        </Breadcrumbs>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton
              onClick={() =>
                router.push(`/orders/${encodeURIComponent(decodedId)}`)
              }
              sx={{
                bgcolor: (theme) =>
                  theme.palette.mode === "light"
                    ? "common.white"
                    : "rgba(255,255,255,0.05)",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "14px",
                p: 1.5,
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)",
                "&:hover": { bgcolor: "primary.main", color: "white" },
              }}
            >
              <BackIcon />
            </IconButton>
            <Box>
              <Typography
                variant="h4"
                fontWeight="900"
                sx={{
                  background: (theme) =>
                    theme.palette.mode === "light"
                      ? "linear-gradient(135deg, #2D3FEA 0%, #9F2DFB 100%)"
                      : "linear-gradient(135deg, #8A94FF 0%, #D88AFF 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  mb: 0.5,
                  letterSpacing: -1,
                }}
              >
                Modify Order {decodedId}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="600"
              >
                Update administrative details and processing status
              </Typography>
            </Box>
          </Stack>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: "14px",
              textTransform: "none",
              fontWeight: "900",
              boxShadow: (theme) =>
                `0 10px 20px -5px ${theme.palette.primary.main}40`,
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: (theme) =>
                  `0 12px 25px -5px ${theme.palette.primary.main}60`,
              },
            }}
          >
            Save Changes
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              borderRadius: "28px",
              backgroundImage: "none",
              background: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.7)"
                  : "rgba(30, 30, 30, 0.4)",
              backdropFilter: "blur(12px)",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ mb: 4 }}
              >
                <Box
                  sx={{
                    p: 1.2,
                    bgcolor: "primary.lighter",
                    borderRadius: "12px",
                    display: "flex",
                  }}
                >
                  <OrderIcon color="primary" />
                </Box>
                <Typography variant="h6" fontWeight="900">
                  Status & Finance
                </Typography>
              </Stack>
              <Stack spacing={3}>
                <TextField
                  select
                  fullWidth
                  label="Order Processing Status"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "16px",
                      bgcolor: (theme) =>
                        theme.palette.mode === "light"
                          ? "common.white"
                          : "rgba(255,255,255,0.03)",
                    },
                  }}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Processing">Processing</MenuItem>
                  <MenuItem value="Shipped">Shipped</MenuItem>
                  <MenuItem value="Delivered">Delivered</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  label="Adjusted Order Total ($)"
                  type="number"
                  value={formData.total}
                  onChange={(e) =>
                    setFormData({ ...formData, total: e.target.value })
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "16px",
                      bgcolor: (theme) =>
                        theme.palette.mode === "light"
                          ? "common.white"
                          : "rgba(255,255,255,0.03)",
                    },
                  }}
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card
            sx={{
              borderRadius: "28px",
              backgroundImage: "none",
              background: (theme) =>
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.7)"
                  : "rgba(30, 30, 30, 0.4)",
              backdropFilter: "blur(12px)",
              border: "1px solid",
              borderColor: "divider",
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" fontWeight="900" gutterBottom>
                Internal Administrative Notes
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3 }}
                fontWeight="600"
              >
                Staff-only comments regarding this specific transaction.
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={6}
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                placeholder="Enter order notes here..."
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "16px",
                    bgcolor: (theme) =>
                      theme.palette.mode === "light"
                        ? "common.white"
                        : "rgba(255,255,255,0.03)",
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
