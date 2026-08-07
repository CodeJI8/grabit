<?php

function isEmpty(...$fields)
{
    foreach ($fields as $field) {

        if ($field === null) {
            return true;
        }

        if (is_string($field) && trim($field) === "") {
            return true;
        }

    }

    return false;
}