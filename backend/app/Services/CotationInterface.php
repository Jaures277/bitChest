<?php

namespace App\Services;

interface CotationInterface
{
    function getFirstCotation(string $cryptoname): float;
    function getCotationFor(string $cryptoname): float;
}
