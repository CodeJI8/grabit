<?php

function isEmpty(...$fields)
{
    foreach ($fields as $field) {
        if (empty(trim($field))) {
            return true;
        }
    }

    return false;
}