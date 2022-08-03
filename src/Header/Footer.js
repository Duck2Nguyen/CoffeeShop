import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.scss'
import { FaFacebookF } from 'react-icons/fa';
import { BsTwitter } from 'react-icons/bs';
import { FaLinkedinIn } from 'react-icons/fa';
import { AiFillInstagram } from 'react-icons/ai';

function Footer() {
    const handleInput = () => {
    }
    const [value, setValue] = useState(false);
    const [arrValue, setarrValue] = useState([]);

    return (
        <footer class="site-footer">
            <div class="container">
                <div class="row">
                    <div class="col-sm-12 col-md-6">
                        <h6>About US</h6>
                        <p class="text-justify">We opened our first location in downtown Greenville, SC on February 11, 2015 with pennies in the bank and a line out the door. And we've been roasting coffee since summer of 2016.
                            We believe that any successful business is built upon three pillars: exceptional product, customer service, and experience.
                        </p>
                    </div>

                    <div class="col-xs-6 col-md-3">
                        <h6>Categories</h6>
                        <ul class="footer-links">
                            <li><a href="#">Coffee</a></li>
                            <li><a href="#">Cake</a></li>
                            <li><a href="#">Tea</a></li>
                            <li><a href="#">Collaboration</a></li>
                            <li><a href="#">Single Origin</a></li>
                        </ul>
                    </div>

                    <div class="col-xs-6 col-md-3">
                        <h6>Quick Links</h6>
                        <ul class="footer-links">
                            <li><a href="http://scanfcode.com/about/">About Us</a></li>
                            <li><a href="http://scanfcode.com/contact/">Contact Us</a></li>
                            <li><a href="http://scanfcode.com/contribute-at-scanfcode/">Contribute</a></li>
                            <li><a href="http://scanfcode.com/privacy-policy/">Privacy Policy</a></li>
                            <li><a href="http://scanfcode.com/sitemap/">Sitemap</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="container footer-line">
                <div class="row">
                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <p class="copyright-text">Copyright &copy; 2022 All Rights Reserved by
                            <a href="#"> CoffeeShop</a>.
                        </p>
                    </div>

                    <div class="col-md-6 col-sm-6 col-xs-12">
                        <ul class="social-icons">
                            <li><a class="facebook" href="#"><FaFacebookF /></a></li>
                            <li><a class="twitter" href="#"><BsTwitter /></a></li>
                            <li><a class="dribbble" href="#"><FaLinkedinIn /></a></li>
                            <li><a class="linkedin" href="#"><AiFillInstagram /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
export default Footer