<?php
/*
Template Name: Product Page
*/
get_template_part('template-parts/header-parts');
get_template_part('template-parts/bredcrumb-parts');

$current_term = get_queried_object();

$args = array(
    'post_type'      => 'remedial_product',
    'posts_per_page' => -1,
    'post_status'    => 'publish',
    'order'          => 'DESC',
    'tax_query'      => array(
        array(
            'taxonomy' => 'she_biological_cat',
            'field'    => 'term_id',
            'terms'    => $current_term->term_id,
        ),
    ),
);

$query = new WP_Query($args);
?>

<section class="content-inner bg-white">
    <div class="container">
        <div class="row">

            <?php if ($query->have_posts()) : ?>

                <table style="width:100%; margin-top:30px; border-collapse:collapse;" border="1" cellpadding="10">

                    <thead>
                        <tr>
                            <th colspan="6" align="center" style="text-align:center;">
                                <?php echo esc_html($current_term->name); ?>
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        <tr>
                            <th>Sr No.</th>
                            <th>Product Name</th>
                            <th>Particular</th>
                            <th>Packing</th>
                            <th>Pack In</th>
                        </tr>

                        <?php
                        $i = 1;

                        while ($query->have_posts()) :
                            $query->the_post();

                            $particular = get_post_meta(get_the_ID(), 'particular', true);
                            $packing    = get_post_meta(get_the_ID(), 'packing', true);
                            $pack_in    = get_post_meta(get_the_ID(), 'pack_in', true);
                        ?>

                            <tr>

                                <td><?php echo $i; ?></td>

                                <td>
                                    <a href="<?php the_permalink(); ?>">
                                        <?php the_title(); ?>
                                    </a>
                                </td>

                                <td>
                                    <?php echo !empty($particular) ? esc_html($particular) : '-'; ?>
                                </td>

                                <td>
                                    <?php echo !empty($packing) ? esc_html($packing) : '-'; ?>
                                </td>

                                <td>
                                    <?php echo !empty($pack_in) ? esc_html($pack_in) : '-'; ?>
                                </td>

                            </tr>

                        <?php
                            $i++;
                        endwhile;
                        ?>

                    </tbody>

                </table>

            <?php endif; wp_reset_postdata(); ?>

        </div>
    </div>
</section>

<?php get_template_part('template-parts/footer-home'); ?>