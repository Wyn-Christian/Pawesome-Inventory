import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";

import Grid from "@mui/material/Unstable_Grid2";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../app/services/product";
import { useGetMediasQuery } from "../../app/services/media";
import { enqueueSnackbar } from "notistack";
import { useGetCategoriesQuery } from "../../app/services/category";
import { useEffect } from "react";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editProduct] = useUpdateProductMutation();
  const { data: product = {}, isSuccess, isLoading } = useGetProductQuery(id);
  const {
    data: medias = [],
    isSuccess: isMediaSuccess,
    isLoading: isMediaLoading,
  } = useGetMediasQuery();
  const {
    data: categories = [],
    isSuccess: isCategoriesSuccess,
    isLoading: isCategoriesLoading,
  } = useGetCategoriesQuery();

  const formik = useFormik({
    initialValues: {
      name: "",
      quantity: 1,
      unit: "kg",
      buy_price: 100,
      sale_price: 100,
      media: "",
      category: "",
    },
  });

  useEffect(() => {
    if (isSuccess) {
      formik.setValues({
        name: product.name,
        quantity: product.quantity,
        unit: product.unit,
        buy_price: product.buy_price,
        sale_price: product.sale_price,
        media: product.media,
        category: product.category,
      });
    }
  }, [product, isSuccess]);

  const onSubmit = async () => {
    await editProduct({ id, product: formik.values })
      .unwrap()
      .then((res) => {
        console.log("Edit Product Successfully", res);
        enqueueSnackbar("Edit Product Successfully!", {
          variant: "success",
        });
        navigate(`/products`);
      })
      .catch((err) => console.error(err));
  };

  let content;
  if (isLoading || isMediaLoading || isCategoriesLoading) {
    content = <Box>Hello</Box>;
  } else {
    content = (
      <Box>
        <Typography variant="h3" mb={3}>
          Edit Product
        </Typography>
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <Paper>
              <Typography variant="h5" sx={{ px: 2, py: 1.5 }}>
                Basic info
              </Typography>
              <Divider />
              <Stack sx={{ p: 2 }} spacing={3}>
                <TextField
                  fullWidth
                  label="Product Title"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <Stack direction="row" spacing={3}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Quantity"
                    name="quantity"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                  />
                  <TextField
                    fullWidth
                    label="Unit"
                    name="unit"
                    value={formik.values.unit}
                    onChange={formik.handleChange}
                  />
                </Stack>
              </Stack>
            </Paper>
          </Grid>
          <Grid xs={12} md={6}>
            <Paper>
              <Typography variant="h5" sx={{ px: 2, py: 1.5 }}>
                Price
              </Typography>
              <Divider />
              <Stack sx={{ p: 2 }} spacing={3}>
                <TextField
                  fullWidth
                  type="number"
                  label="Buying price"
                  name="buy_price"
                  value={formik.values.buy_price}
                  onChange={formik.handleChange}
                />
                <TextField
                  fullWidth
                  type="number"
                  label="Selling Price"
                  name="sale_price"
                  value={formik.values.sale_price}
                  onChange={formik.handleChange}
                />
              </Stack>
            </Paper>
          </Grid>
          <Grid xs={12} md={6}>
            <Paper>
              <Typography variant="h5" sx={{ px: 2, py: 1.5 }}>
                Category
              </Typography>
              <Divider />
              <Box p={2}>
                <FormControl fullWidth>
                  <InputLabel id="supplier-level-label">
                    Choose Category
                  </InputLabel>

                  <Select
                    labelId="supplier-level-label"
                    label="Choose Category"
                    name="category"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                  >
                    {categories.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Paper>
          </Grid>
          <Grid xs={12} md={6}>
            <Paper>
              <Typography variant="h5" sx={{ px: 2, py: 1.5 }}>
                Photo
              </Typography>
              <Divider />
              <Box p={2}>
                <FormControl fullWidth>
                  <InputLabel id="supplier-level-label">Media</InputLabel>

                  <Select
                    labelId="supplier-level-label"
                    label="Media"
                    name="media"
                    value={formik.values.media}
                    onChange={formik.handleChange}
                  >
                    {medias.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.file_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Paper>
          </Grid>
          <Grid xs={12}>
            <Button variant="contained" onClick={onSubmit}>
              Edit Product
            </Button>
          </Grid>
        </Grid>
      </Box>
    );
  }

  return <Box>{content}</Box>;
}

export default EditProduct;
