### Update Tips:
* #### Database (data/dictionary.json) update instruction.

1. change version of `<p>` tag `نسخه` in `./index.html` on `<footer>`
2. change `CACHE_NAME` variable in `./sw.js`
3. Increase the `v` parameter in all *script-including-tags* inside `index.html` file.
e.g. `<script src="yalda.js?v=4"></script>` increase the `?v=4` value by 1 for each script that modefied. 